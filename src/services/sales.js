import axios from "axios";

const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;

export const getSales = async () => {
  try {
    const salesResponse = await axios.get(`${REACT_APP_BACKEND}/api/sales`, {
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    });
    if (salesResponse.status === 200) {
      return salesResponse.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createSale = async ({
  products,
  customerIdNumber,
  customerName,
  salesManager,
}) => {
  try {
    const userByIdResponse = await axios.post(
      `${REACT_APP_BACKEND}/api/sales/create`,
      { products, customerIdNumber, customerName, salesManager },
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

export const updateSaleById = async ({ uid, state }) => {
  try {
    const userByIdResponse = await axios.put(
      `${REACT_APP_BACKEND}/api/sales`,
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
