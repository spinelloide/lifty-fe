import authServices from "../services/AuthServices";

export const useAuth = (): boolean => {
  const authData = authServices.getLoginData();

  if (authData) {
    return true;
  } else {
    return false;
  }
};
