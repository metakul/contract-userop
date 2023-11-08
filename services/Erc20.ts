//basic server for 

import { ethers,  } from "ethers";
import { config } from "dotenv";

config();

export async function approveAndSignToken(
  ERC20Contract:any,
  ERC20Address: string,
  value: string,
):Promise<any> {

  
  const [symbol, decimals] = await Promise.all([
    ERC20Contract.symbol(),
    ERC20Contract.decimals(),
  ]);
  const amount = ethers.utils.parseUnits(value, decimals);
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
}


export async function transfer(
  ERC20Contract:any,
  ERC20Address: string,
  receiverAddress:string,
  value: string,
):Promise<any> {

  const amount = ethers.utils.parseUnits(value);

  const callTo=[ERC20Address]

  const callData =[ERC20Contract.interface.encodeFunctionData("transfer", [receiverAddress, amount])]
  const getUserOp = {
    callTo,
    callData // Fixed the typo here
  };
  return getUserOp;
}

