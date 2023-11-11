"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unstakeToken = exports.claimRewards = exports.stakeNFT = void 0;
const ethers_1 = require("ethers");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function stakeNFT(ERC721Contract, ERC721Address, StakingContract, StakingAddress, tokenID) {
    return __awaiter(this, void 0, void 0, function* () {
        const Id = ethers_1.ethers.BigNumber.from(tokenID);
        console.log(Id);
        const callTo = [ERC721Address, StakingAddress];
        const callData = [ERC721Contract.interface.encodeFunctionData("approve", [StakingAddress, Id]),
            StakingContract.interface.encodeFunctionData("stake", [[Id]])];
        const getUserOp = {
            callTo,
            callData,
        };
        return getUserOp;
    });
}
exports.stakeNFT = stakeNFT;
function claimRewards(StakingContract, StakingAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const callTo = [StakingAddress];
        const callData = [
            StakingContract.interface.encodeFunctionData("claimRewards", [])
        ];
        const getUserOp = {
            callTo,
            callData,
        };
        return getUserOp;
    });
}
exports.claimRewards = claimRewards;
function unstakeToken(StakingContract, StakingAddress, tokenID) {
    return __awaiter(this, void 0, void 0, function* () {
        const Id = ethers_1.ethers.BigNumber.from(tokenID);
        console.log(Id);
        const callTo = [StakingAddress];
        const callData = [
            StakingContract.interface.encodeFunctionData("withdraw", [[Id]])
        ];
        const getUserOp = {
            callTo,
            callData,
        };
        return getUserOp;
    });
}
exports.unstakeToken = unstakeToken;
