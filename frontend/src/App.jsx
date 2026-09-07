import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Claim from "./pages/Claim.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/claim" element={<Claim />} />

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default App;