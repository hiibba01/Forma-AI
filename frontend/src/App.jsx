import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Claim from "./pages/Claim.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Temporary Claim route */}
                <Route path="/claim" element={<Claim />} />

                {/* Default route */}
                <Route path="/" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;