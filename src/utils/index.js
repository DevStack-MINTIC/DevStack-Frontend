export const isLogin = () => !!sessionStorage.getItem("token");

export const saveInfo = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};