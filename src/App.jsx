import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // esse caminho precisa ser exato!
import Cliente from "./pages/Clientes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Cliente />} />
      </Routes>
    </Router>
  );
}

export default App;
