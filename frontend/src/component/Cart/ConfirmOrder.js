import React, { Fragment, useState, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useAlert } from "react-alert";

import { applyCoupon } from "../../actions/couponAction";
// import { APPLY_COUPON_SUCCESS } from "../../constants/couponConstants";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  // const tax = subtotal * 0.18;

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const { success, coupon, error } = useSelector((state) => state.applyCoupon);

  const totalPrice = shippingCharges + subtotal - discountAmount;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCouponHandler = async () => {
    setAppliedCoupon(couponCode);
    await dispatch(applyCoupon(couponCode));

    if (error) {
      setDiscountAmount(0);
      // alert.error("Invalid Coupon");
    }
  };

  const removeCouponHandler = () => {
    setDiscountAmount(0);
    if (appliedCoupon && success) {
      setAppliedCoupon(null);
      dispatch(applyCoupon(""));
    }
  };

  useEffect(() => {
    if (success) {
      setDiscountAmount((subtotal * coupon.coupon.discount) / 100);
    }
  }, [success, coupon, subtotal]);

  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("/api/v1/getkey");

    const {
      data: { order },
    } = await axios.post("/api/v1/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "FabTokri", //your business name
      description: "Ecommerce Website",
      // image: "https://example.com/your_logo", //add your logo
      order_id: order.id,
      callback_url: "http://localhost:4000/api/v1/paymentverification",
      prefill: {
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#500024",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              {appliedCoupon && success && !error && (
                <div className="discountSection">
                  <p>Discount:</p>
                  <span>{appliedCoupon}</span>
                  <button
                    className="removeButton"
                    onClick={removeCouponHandler}
                  >
                    Remove
                  </button>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              {error && (
                <div>
                  <p>Discount:</p>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              {/* <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div> */}
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            {!appliedCoupon && !error && (
              <div className="couponInput">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="couponInputField"
                  onChange={handleCouponChange}
                />
                <button
                  className="applyCouponButton"
                  onClick={applyCouponHandler}
                >
                  APPLY
                </button>
              </div>
            )}

            {error && (
              <div className="couponInput">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="couponInputField"
                  onChange={handleCouponChange}
                />
                <button
                  className="applyCouponButton"
                  onClick={applyCouponHandler}
                >
                  APPLY
                </button>
              </div>
            )}

            <button onClick={() => checkoutHandler(totalPrice)}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
