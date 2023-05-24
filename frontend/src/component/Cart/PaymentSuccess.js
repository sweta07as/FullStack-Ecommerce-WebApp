import React, { Fragment } from "react";
import "./PaymentSuccess.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { removeItemsFromCart } from "../../actions/cartAction";

import { useSelector, useDispatch } from "react-redux";

import { createOrder } from "../../actions/orderAction";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

const PaymentSuccess = ({ response }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.user);
  // const { error } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceNum = searchParams.get("reference");

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    // taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  order.paymentInfo = {
    id: referenceNum,
    status: "succeeded",
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  if (cartItems) {
    cartItems.forEach((item) => {
      deleteCartItems(item.product);
    });
  }

  dispatch(createOrder(order));

  return (
    <Fragment>
      <div className="paymentSuccess">
        <CheckCircleIcon />
        <Typography>Your order has been placed successfully</Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </Fragment>
  );
};

export default PaymentSuccess;
