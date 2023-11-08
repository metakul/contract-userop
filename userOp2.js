"use strict";
// Welcome to the ERC-4337 tutorial #1!
// This tutorial walks you though a simple ERC-4337 transaction: sending a User Operation
// with gas paid by a Paymaster.
//
// You can view more information about this tutorial at
// https://docs.stackup.sh/docs/get-started-with-stackup
//
// Enter `npm run dev` into your terminal to run.
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
// This example uses the userop.js library to build the transaction, but you can use any
// library.
const ethers_1 = require("ethers");
const userop_1 = require("userop");
// mainnet =7bc8690497a0167006c411a812092722b6ae8c541e3a5cc241d1e43ad6dda6db
const rpcUrl = "https://api.stackup.sh/v1/node/2580064e568dd531ab962cf1537119d0cd8063d4ea8a4ce37e280d2f933e41c1";
const paymasterUrl = "https://api.stackup.sh/v1/paymaster/2580064e568dd531ab962cf1537119d0cd8063d4ea8a4ce37e280d2f933e41c1";
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const paymasterContext = { type: "payg" };
        const paymasterMiddleware = userop_1.Presets.Middleware.verifyingPaymaster(paymasterUrl, paymasterContext);
        const opts = paymasterUrl.toString() === "" ? {} : {
            paymasterMiddleware: paymasterMiddleware,
        };
        // Initialize the account
        const signingKey = "117785e40d9169b9dcfdaafeb4865a31aae7095fd8fbbfcfb6af620b66574d96";
        const signer = new ethers_1.ethers.Wallet(signingKey);
        var builder = yield userop_1.Presets.Builder.SimpleAccount.init(signer, rpcUrl, opts);
        const address = builder.getSender();
        console.log(`Account address: ${address}`);
        // Create the call data
        const to = address; // Receiving address, in this case we will send it to ourselves
        const token = "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B"; // Address of the ERC-20 token
        const value = "0"; // Amount of the ERC-20 token to transfer
        // Read the ERC-20 token contract
        const ERC20_ABI = require("./abi/abi.json"); // ERC-20 ABI in json format
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
        const erc20 = new ethers_1.ethers.Contract(token, ERC20_ABI, provider);
        const decimals = yield Promise.all([erc20.decimals()]);
        const amount = ethers_1.ethers.utils.parseUnits(value, decimals);
        // Encode the calls
        const callTo = [token, token];
        const callData = [erc20.interface.encodeFunctionData("approve", [to, amount]),
            erc20.interface.encodeFunctionData("transfer", [to, amount])];
        console.log(callTo, callData);
        // Send the User Operation to the ERC-4337 mempool
        const client = yield userop_1.Client.init(rpcUrl);
        const res = yield client.sendUserOperation(builder.executeBatch(callTo, callData), {
            onBuild: (op) => console.log("Signed UserOperation:", op),
        });
        // Return receipt
        console.log(`UserOpHash: ${res.userOpHash}`);
        console.log("Waiting for transaction...");
        const ev = yield res.wait();
        console.log(`Transaction hash: ${(_a = ev === null || ev === void 0 ? void 0 : ev.transactionHash) !== null && _a !== void 0 ? _a : null}`);
        console.log(`View here: https://jiffyscan.xyz/userOpHash/${res.userOpHash}`);
    });
}
main().catch((err) => console.error("Error:", err));
