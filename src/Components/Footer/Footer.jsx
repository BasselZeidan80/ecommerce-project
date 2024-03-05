import React from "react";
import "./Footer.css";
import imgs from "../../images/freshcart-logo.svg";
export default function Footer() {
  return (
    <>
      <div className="footer text-center">
        <div className="container  ">
          <h3>Get The FreshCart app</h3>
          <p>
            We Will Send You a Link , Open It Your Phone To Download The App
          </p>

          <div className="inparea w-75 mx-auto d-flex justify-content-center  ">
            <input
              type="email"
              placeholder="Email.."
              className="form-control"
            />
            <button className="btn w-25 btn-success text-center ">Share App Link</button>
          </div>
          <hr />

          <div className="row mx-auto d-flex align-items-center justify-content-center  text-center   ">

          <div className="col-lg-4 mb-3 text-center ">
            <div className="paymentImage mt-2 text-center mx-auto">
              <img src={imgs} alt="icon" className="w-100" />
            </div>

            </div>


            <div className="col-lg-4 mb-2">
            <p className="fw-bold">Payment Partners </p>
            <p className="fw-bold">Contact Me:</p>
            <div className="socialLinks">
            <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-twitter"></i>
              </div>
            </div>
            
            <div className="col-lg-4 mb-2 text-center">
              <div className="paymentImage mx-auto mt-2">
            <img  className="w-100" src="https://www.transparentpng.com/thumb/payment-method/aN9nfk-payment-method-background.png" alt="payment method background @transparentpng.com"></img>
            </div>

            </div>
          </div>
       
        </div>
      </div>
    </>
  );
}
