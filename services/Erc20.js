"use strict";
//basic server for 
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
exports.transfer = exports.approveAndSignToken = void 0;
const ethers_1 = require("ethers");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function approveAndSignToken(ERC20Contract, ERC20Address, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const [symbol, decimals] = yield Promise.all([
            ERC20Contract.symbol(),
            ERC20Contract.decimals(),
        ]);
        const amount = ethers_1.ethers.utils.parseUnits(value, decimals);
        console.log(`Approving ${value} ${symbol}...`);
        const callTo = [ERC20Address, ERC20Address];
        const callData = [
            ERC20Contract.interface.encodeFunctionData("approve", [ERC20Address, amount]),
            ERC20Contract.interface.encodeFunctionData("transfer", [ERC20Address, amount])
        ];
        const getUserOp = {
            callTo,
            callData, // Fixed the typo here
        };
        return getUserOp;
    });
}
exports.approveAndSignToken = approveAndSignToken;
function transfer(ERC20Contract, ERC20Address, receiverAddress, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const amount = ethers_1.ethers.utils.parseUnits(value);
        const callTo = [ERC20Address];
        const callData = [ERC20Contract.interface.encodeFunctionData("transfer", [receiverAddress, amount])];
        const getUserOp = {
            callTo,
            callData // Fixed the typo here
        };
        return getUserOp;
    });
}
exports.transfer = transfer;
