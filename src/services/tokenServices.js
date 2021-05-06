export const setTokenService = () => {
  localStorage.setItem("token", "Bearer Adaasdsadadasdsadda");
};

export const getTokenService = () => localStorage.getItem("token");

export const clearTokenService = () => localStorage.removeItem("token");

export const isLogin = () => {
  if (localStorage.getItem("token")) return true;
  return false;
};
