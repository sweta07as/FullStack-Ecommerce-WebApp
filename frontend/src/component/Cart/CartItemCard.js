import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="img" />
      <div>
        <Link to={`product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        {/* changed */}
        {/* <p onClick={() => {if(item.quantity === 0){deleteCartItems(item.product);}}}>Remove</p> */}
      </div>
    </div>
  );
};

export default CartItemCard;
