import axios from "axios";

const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;

export const getProducts = async () => {
  try {
    const productsResponse = await axios.get(`${REACT_APP_BACKEND}/api/products`, {
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    });
    if (productsResponse.status === 200) {
      return productsResponse.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (uid) => {
    try {
      const userByIdResponse = await axios.post(
        `${REACT_APP_BACKEND}/api/products`,
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

export const createProduct = async ({
  name,
  value,
  state,
}) => {
  try {
    const userByIdResponse = await axios.post(
      `${REACT_APP_BACKEND}/api/products/create`,
      { name, value, state },
      {
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      }
    );
    if (userByIdResponse.status === 200) {
      return userByIdResponse.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProductById = async ({ uid, state, value, name }) => {
  try {
    const userByIdResponse = await axios.put(
      `${REACT_APP_BACKEND}/api/products`,
      { uid, state, value, name },
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
