import axios from "axios";

const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;

export const getUsers = async () => {
    try {
      const productsResponse = await axios.get(
        `${REACT_APP_BACKEND}/api/users`,
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

  export const updateUserById = async ({ uid, state }) => {
    try {
      const userByIdResponse = await axios.put(
        `${REACT_APP_BACKEND}/api/users`,
        { uid, state },
        {
          headers: {
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (userByIdResponse.status === 204) {
        console.log("Actualizado correctamente!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  