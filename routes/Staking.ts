import { Application, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {stakeNFT, claimRewards,unstakeToken } from "../services/Staking";
import { SignUserOpViaAuth } from "../services/SignUserOpViaAuth";
function initializeStakingRoutes(
  app: Application,
  ERC721Contract: any,
  ERC721Address: string,
  StakingContract:any,
  StakingAddress:string
) {

  // Handle POST requests to add a position
  app.post("/stakeNFT", async (req: Request, res: Response) => {
    try {
      const {  tokenID, password } = req.body;

      // Extract the authorization token from the request headers
      const bearerToken = req.headers.authorization as string;

      if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Extract the JWT token (remove 'Bearer ' from the token string)
      const token = bearerToken.split(" ")[1];

      // Verify and decode the JWT token
      interface DecodedToken {
        smartWalletAddress: string; // Adjust the type to match the actual data type of walletaddress
        // Add other properties if present in the decoded token
      }
      
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as DecodedToken;
      
      const ownerAddress = decoded.smartWalletAddress;

      
      const getUserOp = await stakeNFT(
        ERC721Contract,
        ERC721Address,
        StakingContract,
        StakingAddress,
        tokenID
      );
         // Relay the transaction via smart wallet
         try {
          // Sign User Operation and wait for the result
          const signUserOp: any = await SignUserOpViaAuth(
            ERC721Contract,
            getUserOp,
            password,
            bearerToken
          ); 
        
          console.log(signUserOp.data.data)
  
          // Respond to the client
          if (signUserOp.data.data.transactionHash) {
            // Respond to the client with success  
            res.status(200).json({
              message: "NFT Staked ",
              details: signUserOp.data,
            });
          } else {
            // Handle the case where the relayed transaction failed
            res.status(400).json({ error: signUserOp });
          }
        } catch (error: any) {
          console.log(error)
  
          res.status(500).json({
            message: "Failed to Submit user Operation",
            error: error, // Include the error message for debugging purposes
          });
        }
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.reason || error.message });
    }
  });
  app.post("/claimRewards", async (req: Request, res: Response) => {
    try {
      const { password } = req.body;

      // Extract the authorization token from the request headers
      const bearerToken = req.headers.authorization as string;

      if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Extract the JWT token (remove 'Bearer ' from the token string)
      const token = bearerToken.split(" ")[1];

      // Verify and decode the JWT token
      interface DecodedToken {
        smartWalletAddress: string; // Adjust the type to match the actual data type of walletaddress
        // Add other properties if present in the decoded token
      }
      
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as DecodedToken;
      

      
      const getUserOp = await claimRewards(
        StakingContract,
        StakingAddress,
      );

         // Relay the transaction via smart wallet
         try {
          // Sign User Operation and wait for the result
          const signUserOp: any = await SignUserOpViaAuth(
            ERC721Contract,
            getUserOp,
            password,
            bearerToken
          );
          console.log(signUserOp.data)
  
          // Respond to the client
          if (signUserOp.data.data.transactionHash) {
            // Respond to the client with success
  
            res.status(200).json({
              message: "Rewards Claime ",
              details: signUserOp.data,
            });
          } else {
            // Handle the case where the relayed transaction failed
            res.status(400).json({ error: signUserOp });
          }
        } catch (error: any) {
          console.log(error.data)
  
          res.status(500).json({
            message: "Failed to Submit user Operation",
            error: error, // Include the error message for debugging purposes
          });
        }
    } catch (error: any) {
      console.log(error.data)
      res.status(500).json({ error: error.reason || error.message });
    }
  });

  app.post("/unstakeNFT", async (req: Request, res: Response) => {
    try {
      const {  tokenID, password } = req.body;
      console.log(req.body,"hi");

      // Extract the authorization token from the request headers
      const bearerToken = req.headers.authorization as string;

      if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Extract the JWT token (remove 'Bearer ' from the token string)
      const token = bearerToken.split(" ")[1];

      // Verify and decode the JWT token
      interface DecodedToken {
        smartWalletAddress: string; // Adjust the type to match the actual data type of walletaddress
        // Add other properties if present in the decoded token
      }
      
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as DecodedToken;
      
      const ownerAddress = decoded.smartWalletAddress;

      
      const getUserOp = await unstakeToken(
        StakingContract,
        StakingAddress,
        tokenID
      );

         // Relay the transaction via smart wallet
         try {
          // Sign User Operation and wait for the result
          const signUserOp: any = await SignUserOpViaAuth(
            ERC721Contract,
            getUserOp,
            password,
            bearerToken
          );
          console.log(signUserOp.data.data)
  
          // Respond to the client
          if (signUserOp.data.data.transactionHash) {
            // Respond to the client with success
  
            res.status(200).json({
              message: "NFT UnStaked ",
              details: signUserOp.data,
            });
          } else {
            // Handle the case where the relayed transaction failed
            res.status(400).json({ error: signUserOp });
          }
        } catch (error: any) {
          console.log(error.response.data)
  
          res.status(500).json({
            message: "Failed to Submit user Operation",
            error: error, // Include the error message for debugging purposes
          });
        }
    } catch (error: any) {
      console.log(error.response.data)
      res.status(500).json({ error: error.reason || error.message });
    }
  });  
}

export { initializeStakingRoutes };
