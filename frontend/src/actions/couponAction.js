import axios from "axios";

import {
  ADMIN_COUPON_REQUEST,
  ADMIN_COUPON_SUCCESS,
  ADMIN_COUPON_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_DETAILS_FAIL,
  NEW_COUPON_REQUEST,
  NEW_COUPON_SUCCESS,
  NEW_COUPON_FAIL,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
  UPDATE_COUPON_REQUEST,
  UPDATE_COUPON_SUCCESS,
  UPDATE_COUPON_FAIL,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAIL,
  CLEAR_ERRORS,
} from "../constants/couponConstants";

//Apply Coupon
export const applyCoupon = (couponCode) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_COUPON_REQUEST });

    const { data } = await axios.post("/api/v1/coupons/apply", { couponCode });

    dispatch({
      type: APPLY_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLY_COUPON_FAIL,
      payload: error.response.data.message,
    });

    console.log("Coupon application error:", error.response.data.message);
  }
};

//Get All Coupons --Admin
export const getAdminCoupon = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_COUPON_REQUEST });

    const { data } = await axios.get("/api/v1/admin/coupons");

    dispatch({
      type: ADMIN_COUPON_SUCCESS,
      payload: data.coupons,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Coupon Details
export const getSingleCoupon = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COUPON_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/coupon/${id}`);

    dispatch({
      type: COUPON_DETAILS_SUCCESS,
      payload: data.coupon,
    });
  } catch (error) {
    dispatch({
      type: COUPON_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create Coupon
export const createCoupon = (couponData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_COUPON_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/admin/coupon/new`,
      couponData,
      config
    );

    dispatch({
      type: NEW_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Coupon
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COUPON_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/coupon/${id}`);

    dispatch({
      type: DELETE_COUPON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Coupon
export const updateCoupon = (id, couponData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_COUPON_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/v1/admin/coupon/${id}`,
      couponData,
      config
    );

    dispatch({
      type: UPDATE_COUPON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};


//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
