import { AnyAction } from "redux";

type AuthenticationState = Partial<User> | null;

export const authenticationReducer = (
  state: AuthenticationState = null,
  action: AnyAction
) => {
  switch (action.type) {
    case "LOADED_AUTHENTICATION":
      return {
        _id: action._id,
        firstName: action.firstName,
        lastName: action.lastName,
        username: action.username,
        email: action.email,
        fullName: action.fullName,
        role: action.role,
        gender: action.gender,
        birthDate: action.birthDate,
        //access_token: action.access_token,
      };
    case "DELETE_AUTHENTICATION":
      return null;
    default:
      return state;
  }
};
