import React, { useEffect, useState, forwardRef, useCallback } from "react";
import useAuth from "../hooks/useAuth";

import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";

import { createSale } from "../services/sales";
import { getProducts } from "../services";

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const Inscriptions = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const { user, setIsLoading } = useAuth();

  const columns = [
    {title : "Proyecto", field: "proyecto"},
    {title : "Estudiante", field: "estudiante"},
    {title : "Estado ", field: "estado"},
    {title : "Fecha", field: "fecha"},
    {title : "Fecha", field: "fecha2"},
    {title : "Acciones", field: "acciones"},
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    const dataUpdate = [...dataProducts];
    const index = oldData.tableData.id;
    dataUpdate[index] = newData;
    setDataProducts([...dataUpdate]);
    resolve();
  };

  const handleCreateSale = () => {
    setIsLoading(true);
    const products = dataProducts
      .filter((product) => product.amount > 0)
      .map((product) => {
        const { tableData, state, ...rest } = product;
        return rest;
      });
    createSale({
      products,
      salesManager: user.email,
    }).then((response) => {
      getAllProducts();
    }).finally(() => setIsLoading(false));
  };

  const getAllProducts = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      getProducts().then((data) => {
        const newProducts = data?.products
          .filter((product) => product.state)
          .map((product) => ({
            ...product,
            amount: 0,
          }));
        setDataProducts(newProducts);
      }).finally(() => setIsLoading(false));
    }, 200)
    
  }, [setIsLoading]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div className="container">
      <h1 className="my-3">Inscripciones</h1>

      <MaterialTable
        title=""
        columns={columns}
        data={dataProducts}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default Inscriptions;
