import Cookies from "js-cookie";

const tokenString = async (): Promise<string> => {
  if (typeof window !== "undefined") {
    //return localStorage.getItem("userToken") || "";
    return (await Cookies.get("userToken")) || "";
  }
  return "";
};
export const jsonHeader = {
  "Content-Type": "application/json",
};
export const httpHeader = {
  "Content-Type": "application/json",
};
export const jwtJsonHeader = async () => {
  const token = await tokenString();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
export const jwtFormDataHeader = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${tokenString()}`,
};
