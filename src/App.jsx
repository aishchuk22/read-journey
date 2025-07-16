import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter basename="/read-journey">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
