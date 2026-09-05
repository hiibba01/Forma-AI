import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import API from "../api/axios.js";
import { saveAuth } from "../utils/auth.js";
import formaLogo from "../assets/formaa.png";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await API.post("/auth/login", formData);

            const { token, user } = response.data.data;

            saveAuth(token, user);

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to sign in. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 relative overflow-hidden">

            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>

                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">

                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                            <img
                                src={formaLogo}
                                alt="Forma AI Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black">
                        Welcome back
                    </h1>

                    <p className="text-zinc-500 mt-2">
                        Sign in to continue with Forma AI
                    </p>

                </div>

                {/* Login Card */}
                <div className="relative">

                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl blur opacity-10"></div>

                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-7 md:p-8 shadow-2xl">

                        {/* Card Header */}
                        <div className="flex items-center gap-3 mb-7">

                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                                <Sparkles size={20} />
                            </div>

                            <div>
                                <h2 className="font-bold text-lg">
                                    Sign in
                                </h2>

                                <p className="text-xs text-zinc-500">
                                    Access your claims workspace
                                </p>
                            </div>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div>

                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Email address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={17}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                                    />

                                </div>

                            </div>

                            {/* Password */}
                            <div>

                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={17}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                                    />

                                </div>

                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-400 hover:via-amber-400 hover:to-rose-400 font-bold shadow-xl shadow-orange-500/10 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    "Signing in..."
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                        </form>

                        {/* Security */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-600">
                            <ShieldCheck size={15} className="text-orange-500" />
                            <span>Your account is securely protected</span>
                        </div>

                        {/* Register */}
                        <div className="mt-7 pt-6 border-t border-zinc-800 text-center">

                            <p className="text-sm text-zinc-500">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-orange-400 hover:text-orange-300 font-semibold transition"
                                >
                                    Create one
                                </Link>
                            </p>

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-xs text-zinc-700 mt-7">
                    Forma AI · Forms that understand you.
                </p>

            </div>

        </div>
    );
};

export default Login;