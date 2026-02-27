import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Admin from "@/pages/Admin";
import { StoreProvider } from "@/data/StoreContext";
import { CartProvider } from "@/data/CartContext";

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </CartProvider>
    </StoreProvider>
  );
}
