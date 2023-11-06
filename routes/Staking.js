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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeStakingRoutes = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Staking_1 = require("../services/Staking");
const SignUserOpViaAuth_1 = require("../services/SignUserOpViaAuth");
function initializeStakingRoutes(app, ERC721Contract, ERC721Address, StakingContract, StakingAddress) {
    // Handle POST requests to add a position
    app.post("/stakeNFT", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { tokenID, password } = req.body;
            console.log(req.body);
            // Extract the authorization token from the request headers
            const bearerToken = req.headers.authorization;
            if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            // Extract the JWT token (remove 'Bearer ' from the token string)
            const token = bearerToken.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            const ownerAddress = decoded.smartWalletAddress;
            const getUserOp = yield (0, Staking_1.approveandStakeNFT)(ERC721Contract, ERC721Address, StakingContract, StakingAddress, tokenID);
            // Relay the transaction via smart wallet
            try {
                // Sign User Operation and wait for the result
                const signUserOp = yield (0, SignUserOpViaAuth_1.SignUserOpViaAuth)(ERC721Contract, getUserOp, password, bearerToken);
                console.log(signUserOp);
                // Respond to the client
                if (signUserOp.status == 200) {
                    // Respond to the client with success
                    res.status(200).json({
                        message: "NFT Staked ",
                        details: signUserOp.data,
                    });
                }
                else {
                    // Handle the case where the relayed transaction failed
                    res.status(400).json({ error: signUserOp });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "Failed to Submit user Operation",
                    error: error, // Include the error message for debugging purposes
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.reason || error.message });
        }
    }));
    app.post("/claimRewards", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            console.log(password);
            // Extract the authorization token from the request headers
            const bearerToken = req.headers.authorization;
            if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            // Extract the JWT token (remove 'Bearer ' from the token string)
            const token = bearerToken.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            const ownerAddress = decoded.smartWalletAddress;
            const getUserOp = yield (0, Staking_1.claimRewards)(StakingContract, StakingAddress);
            // Relay the transaction via smart wallet
            try {
                // Sign User Operation and wait for the result
                const signUserOp = yield (0, SignUserOpViaAuth_1.SignUserOpViaAuth)(ERC721Contract, getUserOp, password, bearerToken);
                console.log(signUserOp);
                // Respond to the client
                if (signUserOp.status == 200) {
                    // Respond to the client with success
                    res.status(200).json({
                        message: "NFT Staked ",
                        details: signUserOp.data,
                    });
                }
                else {
                    // Handle the case where the relayed transaction failed
                    res.status(400).json({ error: signUserOp });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "Failed to Submit user Operation",
                    error: error, // Include the error message for debugging purposes
                });
            }
        }
        catch (error) {
            console.log(error.data);
            res.status(500).json({ error: error.reason || error.message });
        }
    }));
    app.post("/unstakeNFT", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { tokenID, password } = req.body;
            console.log(req.body);
            // Extract the authorization token from the request headers
            const bearerToken = req.headers.authorization;
            if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            // Extract the JWT token (remove 'Bearer ' from the token string)
            const token = bearerToken.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            const ownerAddress = decoded.smartWalletAddress;
            const getUserOp = yield (0, Staking_1.unstakeToken)(StakingContract, StakingAddress, tokenID);
            // Relay the transaction via smart wallet
            try {
                // Sign User Operation and wait for the result
                const signUserOp = yield (0, SignUserOpViaAuth_1.SignUserOpViaAuth)(ERC721Contract, getUserOp, password, bearerToken);
                console.log(signUserOp);
                // Respond to the client
                if (signUserOp.status == 200) {
                    // Respond to the client with success
                    res.status(200).json({
                        message: "NFT Staked ",
                        details: signUserOp.data,
                    });
                }
                else {
                    // Handle the case where the relayed transaction failed
                    res.status(400).json({ error: signUserOp });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "Failed to Submit user Operation",
                    error: error, // Include the error message for debugging purposes
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.reason || error.message });
        }
    }));
}
exports.initializeStakingRoutes = initializeStakingRoutes;
