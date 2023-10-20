import { useState } from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Note the use of `Routes` instead of `Route`.
import CartPage from "./components/CartPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
