import { ethers,  } from "ethers";
import { config } from "dotenv";

config();

export async function approveandStakeNFT(
  ERC721Contract: any,
  ERC721Address: string,
  StakingContract: any,
  StakingAddress: string,
  tokenID: string,
): Promise<any> {
  const Id = ethers.BigNumber.from(tokenID);
  console.log(Id);

  const callTo = [ERC721Address];
  const callData = [
    ERC721Contract.interface.encodeFunctionData("approve", [StakingAddress, Id])
  ];

  const getUserOp = {
    callTo,
    callData, // Fixed the typo here
  };
  return getUserOp;
}

export async function claimRewards(
  StakingContract: any,
  StakingAddress: string,
): Promise<any> {
  const callTo = [StakingAddress];
  const calldata = [StakingContract.interface.encodeFunctionData("claimRewards", [])];

  const getUserOp = {
    callTo,
    calldata,
  };

  return getUserOp;
}

export async function unstakeToken(
  StakingContract: any,
  StakingAddress: string,
  tokenID: string,
): Promise<any> {
  console.log(tokenID);
  const Id = ethers.BigNumber.from(tokenID);
  console.log(Id);

  const callTo = [StakingAddress];
  const calldata = [StakingContract.interface.encodeFunctionData("withdraw", [Id])];

  const getUserOp = {
    callTo,
    calldata,
  };

  return getUserOp;
}





