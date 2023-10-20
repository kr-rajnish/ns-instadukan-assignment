import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { Button, Card, Flex } from "antd";
import "./cartpage.css";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  let [cardCount, setCardCount] = useState(cartItems.length);
  let [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalPrice = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.product.price,
      0
    );
    setTotalPrice(totalPrice);
    setCardCount(cartItems.length);
  }, [cartItems]);
  // console.log( totalPrice);

  const handleRemoveItem = (index) => {
    const removedItem = cartItems[index];
    setTotalPrice(totalPrice - removedItem.product.price);
    setCardCount(cardCount - 1);
    dispatch(removeFromCart(index));
  };

  const handleClick = () => {
    alert(" 🎉Wish You a Happy Journey 🎈🌟🎊");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgb(51, 26, 0)",
        borderRadius: "20px",
        margin: "20px",
        flexDirection: "column",
        border: "1px solid #000",
        padding: "10px",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(0, 51, 102)",
          color: "white",
          display: "flex",
          position: "sticky",
          justifyContent: "space-between",
          top: "0",
          zIndex: "1",
          alignItems: "center",
          borderRadius: "20px",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        <h1>Your Cart Summary is hear</h1>
        <Link to={"/"}>
          <Button style={{ backgroundColor: "blue", color: "white" }}>
            Go to Home Page
          </Button>
        </Link>
      </div>
      <div className="cart-container">
        {cartItems.map((cartItem, index) => {
          const passenger = cartItem.passengerInfo;
          console.log(cartItem);
          return (
            <Card>
              <h2>Product Name: {cartItem.product.name}</h2>
              <p>Product Description: {cartItem.product.description}</p>
              <p>
                Ticket Price: <span>${cartItem.product.price}</span>
              </p>
              <h3>Passengers:</h3>
              <ul>
                <li>
                  Name: {passenger.name}, Age: {passenger.age}, Email:{" "}
                  {passenger.email}
                  <button
                    onClick={() => handleRemoveItem(index)}
                    style={{ backgroundColor: "blueviolet", color: "white" }}
                  >
                    Remove Item
                  </button>
                </li>
              </ul>
            </Card>
          );
        })}
      </div>
      <div
        className="totalprice"
        style={{
          display: "inline-flex",
          boxShadow: "10px 10px 8px 10px #888888",
          backgroundColor: "rgb(51, 26, 0)",
          borderRadius: "20px",
          margin: "20px",
          flexDirection: "column",
          border: "1px solid #000",
          padding: "10px",
          color: "white",
          
        }}
      >
        <h3>
          Total number of cards: <span>{cardCount}</span>
        </h3>
        <p>
          Total Cart Price Is: <span>${totalPrice}</span>
        </p>
        <Button onClick={handleClick}
        style={{backgroundColor:'#3a3840', color:'#00005a', fontSize:'20px',width: '400px',
  height: '50px',  }}>BUY</Button>
      </div>
    </div>
  );
};

export default CartPage;
