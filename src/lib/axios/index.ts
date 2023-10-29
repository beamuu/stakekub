import axios from "axios";

export const mainnetRpcInstance = axios.create({
  baseURL: "https://rpc.bitkubchain.io"
})