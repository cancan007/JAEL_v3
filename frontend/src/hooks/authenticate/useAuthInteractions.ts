import { LoginUserResultType } from "../api/auth/useAPIPostLoginUser";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

export const loadAuth = (dispatch: AppDispatch, user: LoginUserResultType) => {
  dispatch({
    type: "LOADED_AUTHENTICATION",
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    role: user.role,
    gender: user.gender,
    birthDate: user.birthDate,
  });
  //localStorage.setItem("userToken", user.access_token);
  Cookies.set("userToken", user.access_token, { expires: 1 }); // 1日間保持
};

export const autoLoadAuth = (dispatch: AppDispatch, user: User) => {
  dispatch({
    type: "LOADED_AUTHENTICATION",
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    role: user.role,
    gender: user.gender,
    birthDate: user.birthDate,
  });
};

export const deleteAuth = (dispatch: AppDispatch) => {
  dispatch({ type: "DELETE_AUTHENTICATION" });
  //localStorage.removeItem("userToken");
  Cookies.remove("userToken");
};
