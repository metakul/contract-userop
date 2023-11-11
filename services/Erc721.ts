//basic server for 

import { ethers,  } from "ethers";
import { config } from "dotenv";

config();


export async function safeTransferNFToken(
 ERC721Contract:any,
  ERC721Address: string,
  ownerAddress:string,
  receiverAddress:string,
  tokenID: string,
): Promise<any> {
  const Id = ethers.BigNumber.from(tokenID);
  console.log(Id);

  const callTo = [ERC721Address];
  const callData = [
    ERC721Contract.interface.encodeFunctionData("safeTransferFrom", [ownerAddress,receiverAddress,Id])];

  const getUserOp = {
    callTo,
    callData, 
  };
  return getUserOp;
}




export async function mintNft(
  ownerAddress:string,
  ERC721Contract:ethers.Contract,
  ERC721Address:string
):Promise<any> {

  const allowlistProof=  { 
    "proof": [], 
    "quantityLimitPerWallet": "1", 
    "pricePerToken": "0", 
    "currency": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" 
 }
 const callTo=[ERC721Address]
  const callData = [ ERC721Contract.interface.encodeFunctionData("claim", [ownerAddress,1,"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",0,allowlistProof,[]])]

  const getUserOp={
    callTo,
    callData
  }
  return getUserOp



}



