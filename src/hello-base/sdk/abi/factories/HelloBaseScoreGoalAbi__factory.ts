/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  HelloBaseScoreGoalAbi,
  HelloBaseScoreGoalAbiInterface,
} from "../HelloBaseScoreGoalAbi";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "scorer",
        type: "address",
      },
    ],
    name: "ScoredGoal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "scorer",
        type: "address",
      },
    ],
    name: "hasScoredGoal",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "scoreGoal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class HelloBaseScoreGoalAbi__factory {
  static readonly abi = _abi;
  static createInterface(): HelloBaseScoreGoalAbiInterface {
    return new utils.Interface(_abi) as HelloBaseScoreGoalAbiInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HelloBaseScoreGoalAbi {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as HelloBaseScoreGoalAbi;
  }
}
