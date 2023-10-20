import React from "react";
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

const ProductCard = (props) => {
  const { product } = props;

  return <Card title={product.name}></Card>;
};

export default ProductCard;
