import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { ethers } from "ethers";
import cors from "cors";

import abi from "./abi/abi.json";
import ERC721abi from "./abi/ERC721abi.json";
import Stakingabi from "./abi/Staking.json";

import {initializeRoutes} from "./routes/ERC20";
import {initializeERC721Routes} from "./routes/ERC721";
import {initializeStakingRoutes} from "./routes/Staking";


dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());

const port: number = Number(process.env.PORT) || 8002;
const rpcUrl = process.env.RPC_URL || "";

const ERC20Address = process.env.ERC20Address || "";
const ERC721Address = process.env.ERC721Address || "";
const StakingAddress = process.env.StakingAddress || "";

const provider =new ethers.providers.JsonRpcProvider(rpcUrl);

const ERC20Contract= new ethers.Contract(ERC20Address, abi, provider);
const ERC721Contract= new ethers.Contract(ERC721Address, ERC721abi, provider);
const StakingContract= new ethers.Contract(StakingAddress, Stakingabi, provider);


// Initialize routes for ERC20
initializeRoutes(app, ERC20Contract, ERC20Address);
initializeERC721Routes(app, ERC721Contract, ERC721Address);
initializeStakingRoutes(app, ERC721Contract, ERC721Address,StakingContract,StakingAddress);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app
