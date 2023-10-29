import { ethers } from "ethers";
import { rpcUrls } from "@/eth"
export const ethclient = new ethers.WebSocketProvider(rpcUrls.bkc)