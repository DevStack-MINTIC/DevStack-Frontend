import axios from "axios";
import { saveInfo } from "../utils";

const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;

export const requestToken = async (token, setUser, setError) => {
  try {
    const google = await axios.post(
      `${REACT_APP_BACKEND}/api/auth/google`,
      { token },
      { "Content-Type": "application/json" }
      );
    if (google.status === 200) {
      setUser(google.data.userInfo);
      saveInfo(google.data.token, google.data.userInfo);
    }
  } catch (error) {
    setError(error.response.data.error);
  }
};

export const getProducts = async () => {
  try {
    const productsResponse = await axios.get(
      `${REACT_APP_BACKEND}/api/products`,
      {
        headers: {
          "Content-Type": "application/json",
          "token": sessionStorage.getItem("token")
        }
      }
    );
    if (productsResponse.status === 200) {
      return productsResponse.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (uid) => {
  try {
    const userByIdResponse = await axios.post(
      `${REACT_APP_BACKEND}/api/users`,
      { uid },
      {
        headers: {
          "Content-Type": "application/json",
          "token": sessionStorage.getItem("token")
        }
      }
    );
    if (userByIdResponse.status === 200) {
      return userByIdResponse.data;
    }
  } catch (error) {
    console.log(error);
  }
};
