import React, { Fragment } from "react";
import "./PaymentSuccess.css";

import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceNum = searchParams.get("reference");

  return (
    <Fragment>
      <div className="success">
        <h2>ORDER SUCCESSFULL</h2>
        <p>Reference No. {referenceNum}</p>
      </div>
    </Fragment>
  );
};

export default PaymentSuccess;
