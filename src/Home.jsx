import React, { useState } from "react";
import "./Home.css";
import ProductCard from "./components/ProductCard";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "./redux/cartSlice";
import { Link } from "react-router-dom";

const { Meta } = Card;
const resetPassenger = {
  name: "",
  email: "",
  age: null,
  gender: "Male",
  nationality: "",
  passportNumber: "",
};
const Home = () => {
  const products = [
    {
      id: 1,
      name: "Ferry from Port Blair to Havelock",
      description:
        "Enjoy a comfortable ferry ride from Port Blair to Havelock.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmp9YAKXO7JVC0B9jxrfYpNGm-dp44_d2HA&usqp=CAU",

      price: 1200,
    },
    {
      id: 2,
      name: "Ferry from Havelock to Neil",
      description:
        "Explore the beauty of the Andaman Islands with this ferry from Havelock to Neil.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmp9YAKXO7JVC0B9jxrfYpNGm-dp44_d2HA&usqp=CAU",

      price: 1300,
    },
    {
      id: 3,
      name: "Ferry from Neil to Port Blair",
      description:
        "Return to Port Blair from Neil Island with this convenient ferry service.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmp9YAKXO7JVC0B9jxrfYpNGm-dp44_d2HA&usqp=CAU",

      price: 1400,
    },
    {
      id: 4,
      name: "Ferry from Port Blair to Havelock to Neil and back to Port Blair",
      description:
        "The ultimate island-hopping experience. Visit Havelock, Neil, and return to Port Blair.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmp9YAKXO7JVC0B9jxrfYpNGm-dp44_d2HA&usqp=CAU",

      price: 1500,
    },
  ];
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [passengerarr, setPassengerarr] = useState([]);

  const cartItems = useSelector((state) => {
    console.log(state);
    return state.cart.cartItems;
  });

  const [passengerInfo, setPassengerInfo] = useState(resetPassenger);

  const [cartItem, setCartItem] = useState({ product: null, passengers: [] });

  const handleAddToCart = (product) => {
    setSelectedProduct(product);

    setModalVisible(true);
  };

  const validateIfo = () => {
    // console.log( "validating");
    if (
      passengerInfo.name &&
      passengerInfo.email &&
      passengerInfo.age &&
      passengerInfo.nationality
    ) {
      return true;
    } else {
      alert("Please fill all the fields");
      return false;
    }
  };

  const handleModalOk = () => {
    addPassenger();

    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const addPassenger = () => {
    if (validateIfo()) {
      const newItem = {
        product: selectedProduct,
        passengerInfo: passengerInfo,
      };
      setCartItem(newItem);
      setPassengerarr([...passengerarr, { ...passengerInfo }]);
      dispatch(addToCart(newItem));

      alert("Successfully Added");
      resetPassengerFields();
    }
  };
  console.log(passengerarr);

  const resetPassengerFields = () => {
    setPassengerInfo(resetPassenger);
  };

  return (
    <div className="container">
      <div
        className="gotocart"
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
        <h2>See your Cart Summary </h2>
        <Link to="/cart">
          <Button
            style={{
              backgroundColor: "rgb(153, 0, 0)",
              color: "white",
            }}
          >
            Click me for cart summary
          </Button>
        </Link>
      </div>
      <div className="product-container">
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            style={{ width: 300, margin: "1rem" }}
            cover={<img alt={product.name} src={product.image} />}
            actions={[
              <Button type="primary" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>,
            ]}
          >
            <h2>${product.price}</h2>
            <Meta title={product.name} description={product.description} />
          </Card>
        ))}

        <Modal
          title="Passenger Information"
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form>
            <Form.Item label="Name">
              <Input
                value={passengerInfo.name}
                onChange={(e) =>
                  setPassengerInfo({ ...passengerInfo, name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                value={passengerInfo.email}
                onChange={(e) =>
                  setPassengerInfo({ ...passengerInfo, email: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Age">
              <InputNumber
                value={passengerInfo.age}
                onChange={(value) =>
                  setPassengerInfo({ ...passengerInfo, age: value })
                }
              />
            </Form.Item>
            <Form.Item label="Gender">
              <Select
                value={passengerInfo.gender}
                onChange={(value) =>
                  setPassengerInfo({ ...passengerInfo, gender: value })
                }
              >
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Nationality">
              <Input
                value={passengerInfo.nationality}
                onChange={(e) =>
                  setPassengerInfo({
                    ...passengerInfo,
                    nationality: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Passport Number">
              <Input
                value={passengerInfo.passportNumber}
                onChange={(e) =>
                  setPassengerInfo({
                    ...passengerInfo,
                    passportNumber: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Button
              type="dashed"
              onClick={() => {
                addPassenger();
              }}
            >
              + Add Passenger
            </Button>
          </Form>
        </Modal>
      </div>
      <div className="summry-box"></div>
    </div>
  );
};

export default Home;
