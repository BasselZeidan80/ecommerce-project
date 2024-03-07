import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const mySchema = Yup.object({
  details: Yup.string().required("any data must be req!").min(3).max(20),
  city: Yup.string().required("name must be req!").min(3).max(20),
  phone: Yup.string().required("Phone must be formated egyptian number!"),
  // .matches(/^01[0125][0-9]{8}$/),
});

export default function Payment() {
  const nav = useNavigate();
  const { CartID, getUserCart, clearAllProducts } = useContext(CartContext);

  // const userData = {
  //   details: "",
  //   city: "",
  //   phone: "",
  // };
  const shippingAddress = {
    details: "",
    phone: "",
    city: "",
    isCash: true,
  };

  function onSubmit(values) {
    console.log("submited...", values);
    if (values.isCash) {
      confirmCashPayment(values);
    } else {
      confirmOnlinePayment(values);
    }
  }

  const myFormik = useFormik({
    initialValues: shippingAddress,
    onSubmit: onSubmit,
    validationSchema: mySchema,
    // validationSchema: mySchema,
  });

  function confirmCashPayment(shippingAddress) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CartID}`,
        shippingAddress,
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log("res ", res);
        if (res.data.status === "success") {
          toast.success("payment completed successfully ");
          // getUserCart();

          clearAllProducts();

          setTimeout(() => {
            nav("/Products");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("err ", err);
        toast.error("error occured ");
      });
  }

  // finction online payment

  function confirmOnlinePayment(shippingAddress) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}`,
        shippingAddress,
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: "https://BasselZeidan80.github.io/ecommerce-project/#"},
        }
      )
      .then((res) => {
        console.log("res ", res);
        console.log("res success", shippingAddress);
        if (res.data.status === "success") {
          toast.success("payment completed successfully ");
          // getUserCart();
          window.open(res.data.session.url, "_self");
        }
      })
      .catch((err) => {
        console.log("error ", shippingAddress);

        console.log("err ", err);
        toast.error("error occured ");

      });
  }

  //
  return (
    <>
      <div className="w-50 mx-auto py-4 ">
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="city">city:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.city}
            type="text"
            className="form-control mb-3"
            id="city"
          />
          {myFormik.errors.city && myFormik.touched.city ? (
            <div className="alert alert-danger">{myFormik.errors.city}</div>
          ) : (
            ""
          )}

          <label htmlFor="city">phone:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.phone}
            type="text"
            className="form-control mb-3"
            id="phone"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger">{myFormik.errors.phone}</div>
          ) : (
            ""
          )}

          <label htmlFor="details">details:</label>
          <textarea
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.details}
            type="text"
            className="form-control mb-3"
            id="details"
          />
          {myFormik.errors.details && myFormik.touched.details ? (
            <div className="alert alert-danger">{myFormik.errors.details}</div>
          ) : (
            ""
          )}

          <div className="d-flex align-items-center justify-content-evenly ">
            <button
              type="submit"
              // value={myFormik.values.isCash}
              onClick={() => {
                myFormik.values.isCash = true;
              }}
              className="btn btn-primary btnConfirm"
            >
              Confirm Cash Payment
            </button>

            <button
              type="submit"
              // onClick={() => confirmOnlinePayment}
              onClick={() => {
                myFormik.values.isCash = false;
              }}
              className="btn btn-primary btnConfirm"
            >
              Confirm Online Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
