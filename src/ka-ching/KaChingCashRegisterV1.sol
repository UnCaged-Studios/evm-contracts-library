// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

using SafeERC20 for IERC20;

/// @dev Struct representing a single order item.
struct OrderItem {
    uint256 amount;
    bool credit;
}

/// @dev Struct representing a full order.
struct FullOrder {
    uint128 id; // Order id
    uint32 expiry; // Order expiry
    uint32 notBefore; // Order start time
    address customer; // Address of the customer
    OrderItem[1] items; // Items of the order
}

/// @title KaChingCashRegisterV1
/// @dev This contract defines the KaChing cash register functionality.
/// @notice It includes functions for managing orders and signers, and for settling payments for configured ERC20 token.
/// The role of the cashier is only assignable upon deployment and cannot be changed.
contract KaChingCashRegisterV1 is EIP712, ReentrancyGuard {
    bytes32 private constant _ORDER_ITEM_HASH = keccak256("OrderItem(uint256 amount,bool credit)");
    bytes32 private constant _FULL_ORDER_HASH =
        keccak256("FullOrder(uint128 id,uint32 expiry,uint32 notBefore,address customer,bytes32 itemsHash)");
    uint256 private constant MAX_SIGNERS = 3;

    mapping(uint128 => bool) private _orderProcessed;
    address[] private _orderSignerAddresses;

    /// @notice The cashier is an address capable of updating the order signers.
    address public immutable _cashierRole;

    /// @notice The ERC20 token supported for settle payments.
    IERC20 public immutable _erc20Token;

    /// @dev Event emitted when an order is fully settled.
    event OrderFullySettled(uint128 indexed orderId, address indexed customer);
    /// @dev Event emitted when signers are updated
    event OrderSignersUpdated(address indexed signer1, address indexed signer2, address indexed signer3);

    /// @notice Contract constructor sets the cash register's cashier and supported ERC token.
    /// @param cashier Address of the cashier role.
    /// @param erc20Token Address of the supported ERC20 token.
    constructor(address cashier, address erc20Token) EIP712("KaChingCashRegisterV1", "1") {
        require(cashier != address(0), "Cashier address cannot be 0x0");
        require(erc20Token != address(0), "erc20Token address cannot be 0x0");
        _cashierRole = cashier;
        _erc20Token = IERC20(erc20Token);
    }

    /// @notice A modifier that restricts functions to be called only by the cashier.
    modifier onlyCashier() {
        require(msg.sender == _cashierRole, "Caller is not a cashier");
        _;
    }

    /// @dev Internal function to calculate the hash of an order.
    function _getFullOrderHash(FullOrder memory order) internal pure returns (bytes32) {
        bytes memory itemsPacked = new bytes(32 * order.items.length);
        unchecked {
            for (uint256 i = 0; i < order.items.length; i++) {
                bytes32 itemHash = keccak256(abi.encode(_ORDER_ITEM_HASH, order.items[i].amount, order.items[i].credit));
                uint256 baseIndex = i * 32;
                for (uint256 j = 0; j < 32; j++) {
                    itemsPacked[baseIndex + j] = itemHash[j];
                }
            }
        }
        return keccak256(
            abi.encode(
                _FULL_ORDER_HASH, order.id, order.expiry, order.notBefore, order.customer, keccak256(itemsPacked)
            )
        );
    }

    /// @dev Internal function to check if the signer of an order is valid.
    function _isOrderSignerValid(FullOrder memory order, bytes memory signature) internal view returns (bool) {
        bytes32 fullOrderHash = _getFullOrderHash(order);
        address signer = ECDSA.recover(_hashTypedDataV4(fullOrderHash), signature);

        bool isSignerValid = false;
        unchecked {
            for (uint256 i = 0; i < _orderSignerAddresses.length; i++) {
                if (signer == _orderSignerAddresses[i]) {
                    isSignerValid = true;
                    break;
                }
            }
        }
        return isSignerValid;
    }

    /// @dev Internal function to validate the order payment settlement.
    function _validateOrderPaymentSettlement(FullOrder calldata order, bytes calldata signature, address sender)
        internal
        view
    {
        require(sender == order.customer, "Customer does not match sender address");
        require(block.timestamp < order.expiry, "Order is expired");
        require(block.timestamp >= order.notBefore, "Order cannot be used yet");
        require(_isOrderSignerValid(order, signature), "Invalid signature");
        require(false == _orderProcessed[order.id], "Order already processed");
    }

    /// @dev Internal function to perform transfers of all items in an order.
    function _settleOrderPayment(
        FullOrder calldata order,
        bytes calldata signature,
        address to,
        bool usePermit,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal {
        // read-only validations
        _validateOrderPaymentSettlement(order, signature, msg.sender);

        // change state
        _orderProcessed[order.id] = true;

        OrderItem calldata item = order.items[0];
        if (item.credit) {
            _erc20Token.safeTransfer(to, item.amount);
        } else {
            if (usePermit) {
                IERC20Permit permitToken = IERC20Permit(address(_erc20Token));
                permitToken.permit(to, address(this), item.amount, deadline, v, r, s);
            }
            _erc20Token.safeTransferFrom(to, address(this), item.amount);
        }

        // events
        emit OrderFullySettled(order.id, msg.sender);
    }

    /// @notice External function to settle an order's payment.
    /// @dev This function performs a number of validations before settling an order's payment.
    function settleOrderPayment(FullOrder calldata order, bytes calldata signature) external nonReentrant {
        _settleOrderPayment({
            order: order,
            signature: signature,
            to: msg.sender,
            usePermit: false,
            deadline: uint256(0),
            v: 0,
            r: bytes32(0),
            s: bytes32(0)
        });
    }

    /// @notice External function to settle an order's payment with invoking erc20 permit.
    /// @dev This function performs a number of validations before settling an order's payment.
    function settleOrderPaymentWithPermit(
        FullOrder calldata order,
        bytes calldata signature,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external nonReentrant {
        _settleOrderPayment({
            order: order,
            signature: signature,
            to: msg.sender,
            usePermit: true,
            deadline: deadline,
            v: v,
            r: r,
            s: s
        });
    }

    /// @notice External function to check if an order has been processed.
    function isOrderProcessed(uint128 orderId) external view returns (bool) {
        return _orderProcessed[orderId];
    }

    /// @notice Updates the list of order signers.
    /// @dev Only the cashier can update this list.
    /// @param newSigners New list of signers.
    function setOrderSigners(address[] calldata newSigners) external onlyCashier {
        require(newSigners.length <= MAX_SIGNERS, "Cannot set more than 3 signers");
        for (uint256 i = 0; i < newSigners.length; i++) {
            require(newSigners[i] != address(0), "Signer address cannot be 0x0");
        }
        _orderSignerAddresses = newSigners;
        emit OrderSignersUpdated(
            newSigners.length > 0 ? newSigners[0] : address(0),
            newSigners.length > 1 ? newSigners[1] : address(0),
            newSigners.length > 2 ? newSigners[2] : address(0)
        );
    }

    function getOrderSigners() external view returns (address[] memory) {
        return _orderSignerAddresses;
    }
}
