import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  return <div></div>;
  // <Fragment>
  //   {loading ? <Loader/> : <Fragment>
  //       <MetaData title="Order Details"/>
  //       <div className="orderDetailsPage">
  //           <div className="orderDetailsContainer">
  //               <Typography component="h1">
  //                   Order #{order && order._id}
  //               </Typography>
  //           </div>
  //       </div>
  //   </Fragment> }
  // </Fragment>;
};

export default OrderDetails;
