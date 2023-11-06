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
exports.unstakeToken = exports.claimRewards = exports.approveandStakeNFT = void 0;
const ethers_1 = require("ethers");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function approveandStakeNFT(ERC721Contract, ERC721Address, StakingContract, StakingAddress, tokenID) {
    return __awaiter(this, void 0, void 0, function* () {
        const Id = ethers_1.ethers.BigNumber.from(tokenID);
        console.log(Id);
        const approve = {
            to: ERC721Address,
            value: ethers_1.ethers.constants.Zero,
            data: ERC721Contract.interface.encodeFunctionData("approve", [StakingAddress, Id]),
        };
        const stake = {
            to: StakingAddress,
            value: ethers_1.ethers.constants.Zero,
            data: StakingContract.interface.encodeFunctionData("stake", [[Id]]),
        };
        return [approve, stake];
    });
}
exports.approveandStakeNFT = approveandStakeNFT;
function claimRewards(StakingContract, StakingAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const rewards = {
            to: StakingAddress,
            value: ethers_1.ethers.constants.Zero,
            data: StakingContract.interface.encodeFunctionData("claimRewards", []),
        };
        return [rewards];
    });
}
exports.claimRewards = claimRewards;
function unstakeToken(StakingContract, StakingAddress, tokenID) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(tokenID);
        const Id = ethers_1.ethers.BigNumber.from(tokenID);
        console.log(Id);
        const rewards = {
            to: StakingAddress,
            value: ethers_1.ethers.constants.Zero,
            data: StakingContract.interface.encodeFunctionData("withdraw", [[Id]]),
        };
        return [rewards];
    });
}
exports.unstakeToken = unstakeToken;
