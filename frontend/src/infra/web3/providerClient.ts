import { ethers } from "ethers";

export const createProvider = () => {
  return new ethers.BrowserProvider(window.ethereum);
};
