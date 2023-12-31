import { ethers,  } from "ethers";
import { config } from "dotenv";

config();

export async function stakeNFT(
  ERC721Contract: any,
  ERC721Address: string,
  StakingContract: any,
  StakingAddress: string,
  tokenID: string,
): Promise<any> {
  const Id = ethers.BigNumber.from(tokenID);
  console.log(Id);

  const callTo = [ERC721Address,StakingAddress];
  const callData = [ERC721Contract.interface.encodeFunctionData("approve", [StakingAddress, Id]),
                    StakingContract.interface.encodeFunctionData("stake", [[Id]])];

  const getUserOp = {
    callTo,
    callData, 
  };
  return getUserOp;
}


export async function claimRewards(
  StakingContract: any,
  StakingAddress: string,
): Promise<any> {

  const callTo = [StakingAddress];
  const callData = [
                    StakingContract.interface.encodeFunctionData("claimRewards", [])];

  const getUserOp = {
    callTo,
    callData, 
  };
  return getUserOp;
}



export async function unstakeToken(
  StakingContract: any,
  StakingAddress: string,
  tokenID: string,
): Promise<any> {
  const Id = ethers.BigNumber.from(tokenID);
  console.log(Id);

  const callTo = [StakingAddress];
  const callData = [
                    StakingContract.interface.encodeFunctionData("withdraw", [[Id]])];

  const getUserOp = {
    callTo,
    callData, 
  };
  return getUserOp;
}





