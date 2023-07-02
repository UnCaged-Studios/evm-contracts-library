/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export type OrderItemStruct = {
  amount: BigNumberish;
  currency: string;
  credit: boolean;
};

export type OrderItemStructOutput = [BigNumber, string, boolean] & {
  amount: BigNumber;
  currency: string;
  credit: boolean;
};

export type FullOrderStruct = {
  id: BigNumberish;
  expiry: BigNumberish;
  notBefore: BigNumberish;
  customer: string;
  items: OrderItemStruct[];
};

export type FullOrderStructOutput = [
  BigNumber,
  number,
  number,
  string,
  OrderItemStructOutput[]
] & {
  id: BigNumber;
  expiry: number;
  notBefore: number;
  customer: string;
  items: OrderItemStructOutput[];
};

export interface KaChingCashRegisterV1AbiInterface extends utils.Interface {
  functions: {
    "CASHIER_ROLE()": FunctionFragment;
    "eip712Domain()": FunctionFragment;
    "getOrderSigners()": FunctionFragment;
    "isOrderProcessed(uint128)": FunctionFragment;
    "setOrderSigners(address[])": FunctionFragment;
    "settleOrderPayment((uint128,uint32,uint32,address,(uint256,address,bool)[]),bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CASHIER_ROLE"
      | "eip712Domain"
      | "getOrderSigners"
      | "isOrderProcessed"
      | "setOrderSigners"
      | "settleOrderPayment"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CASHIER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "eip712Domain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOrderSigners",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isOrderProcessed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setOrderSigners",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "settleOrderPayment",
    values: [FullOrderStruct, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "CASHIER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eip712Domain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOrderSigners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isOrderProcessed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOrderSigners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleOrderPayment",
    data: BytesLike
  ): Result;

  events: {
    "EIP712DomainChanged()": EventFragment;
    "OrderFullySettled(uint128,address)": EventFragment;
    "OrderSignersUpdated(address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderFullySettled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderSignersUpdated"): EventFragment;
}

export interface EIP712DomainChangedEventObject {}
export type EIP712DomainChangedEvent = TypedEvent<
  [],
  EIP712DomainChangedEventObject
>;

export type EIP712DomainChangedEventFilter =
  TypedEventFilter<EIP712DomainChangedEvent>;

export interface OrderFullySettledEventObject {
  orderId: BigNumber;
  customer: string;
}
export type OrderFullySettledEvent = TypedEvent<
  [BigNumber, string],
  OrderFullySettledEventObject
>;

export type OrderFullySettledEventFilter =
  TypedEventFilter<OrderFullySettledEvent>;

export interface OrderSignersUpdatedEventObject {
  signer1: string;
  signer2: string;
  signer3: string;
}
export type OrderSignersUpdatedEvent = TypedEvent<
  [string, string, string],
  OrderSignersUpdatedEventObject
>;

export type OrderSignersUpdatedEventFilter =
  TypedEventFilter<OrderSignersUpdatedEvent>;

export interface KaChingCashRegisterV1Abi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: KaChingCashRegisterV1AbiInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    CASHIER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    eip712Domain(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, string, string, BigNumber[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: BigNumber;
        verifyingContract: string;
        salt: string;
        extensions: BigNumber[];
      }
    >;

    getOrderSigners(overrides?: CallOverrides): Promise<[string[]]>;

    isOrderProcessed(
      orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setOrderSigners(
      newSigners: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    settleOrderPayment(
      order: FullOrderStruct,
      signature: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  CASHIER_ROLE(overrides?: CallOverrides): Promise<string>;

  eip712Domain(
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, string, string, BigNumber[]] & {
      fields: string;
      name: string;
      version: string;
      chainId: BigNumber;
      verifyingContract: string;
      salt: string;
      extensions: BigNumber[];
    }
  >;

  getOrderSigners(overrides?: CallOverrides): Promise<string[]>;

  isOrderProcessed(
    orderId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setOrderSigners(
    newSigners: string[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  settleOrderPayment(
    order: FullOrderStruct,
    signature: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    CASHIER_ROLE(overrides?: CallOverrides): Promise<string>;

    eip712Domain(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, string, string, BigNumber[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: BigNumber;
        verifyingContract: string;
        salt: string;
        extensions: BigNumber[];
      }
    >;

    getOrderSigners(overrides?: CallOverrides): Promise<string[]>;

    isOrderProcessed(
      orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setOrderSigners(
      newSigners: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    settleOrderPayment(
      order: FullOrderStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "EIP712DomainChanged()"(): EIP712DomainChangedEventFilter;
    EIP712DomainChanged(): EIP712DomainChangedEventFilter;

    "OrderFullySettled(uint128,address)"(
      orderId?: BigNumberish | null,
      customer?: string | null
    ): OrderFullySettledEventFilter;
    OrderFullySettled(
      orderId?: BigNumberish | null,
      customer?: string | null
    ): OrderFullySettledEventFilter;

    "OrderSignersUpdated(address,address,address)"(
      signer1?: string | null,
      signer2?: string | null,
      signer3?: string | null
    ): OrderSignersUpdatedEventFilter;
    OrderSignersUpdated(
      signer1?: string | null,
      signer2?: string | null,
      signer3?: string | null
    ): OrderSignersUpdatedEventFilter;
  };

  estimateGas: {
    CASHIER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    eip712Domain(overrides?: CallOverrides): Promise<BigNumber>;

    getOrderSigners(overrides?: CallOverrides): Promise<BigNumber>;

    isOrderProcessed(
      orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setOrderSigners(
      newSigners: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    settleOrderPayment(
      order: FullOrderStruct,
      signature: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    CASHIER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    eip712Domain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOrderSigners(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isOrderProcessed(
      orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setOrderSigners(
      newSigners: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    settleOrderPayment(
      order: FullOrderStruct,
      signature: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
