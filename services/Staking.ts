import { ethers,  } from "ethers";
import { config } from "dotenv";

config();

export async function approveandStakeNFT(
  ERC721Contract:any,
  ERC721Address: string,
  StakingContract:any,
  StakingAddress:string,
  tokenID: string,
):Promise<any[]> {


  const Id = ethers.BigNumber.from(tokenID);
  console.log(Id)
  const approve = {
    to: ERC721Address,
    value: ethers.constants.Zero,
    data: ERC721Contract.interface.encodeFunctionData("approve", [StakingAddress, Id]),
  };

  const stake = {
    to: StakingAddress,
    value: ethers.constants.Zero,
    data: StakingContract.interface.encodeFunctionData("stake", [[Id]]),
  };
  return [approve,stake];
}
export async function claimRewards(
  StakingContract:any,
  StakingAddress:string,
):Promise<any[]> {

  const rewards = {
    to: StakingAddress,
    value: ethers.constants.Zero,
    data: StakingContract.interface.encodeFunctionData("claimRewards",[]),
  };
  return [rewards];
}
export async function unstakeToken(
  StakingContract:any,
  StakingAddress:string,
  tokenID: string,
):Promise<any[]> {
    console.log(tokenID)
    const Id = ethers.BigNumber.from(tokenID);
    console.log(Id)

  const rewards = {
    to: StakingAddress,
    value: ethers.constants.Zero,
    data: StakingContract.interface.encodeFunctionData("withdraw" ,[[Id]]),
  };
  return [rewards];
}




