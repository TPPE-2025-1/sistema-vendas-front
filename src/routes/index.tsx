import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Clientes from "../pages/Clientes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </BrowserRouter>
  );
}
