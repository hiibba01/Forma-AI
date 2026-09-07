import { Link, useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "../utils/auth.js";
import formaLogo from "../assets/formaa.png";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        clearAuth();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">

            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />

                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">

                {/* Navbar */}
                <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">

                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <img
                                src={formaLogo}
                                alt="Forma AI"
                                className="w-10 h-10 object-contain"
                            />

                            <div>
                                <h1 className="font-bold">
                                    Forma AI
                                </h1>

                                <p className="text-xs text-zinc-600">
                                    Intelligent Claims
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="text-sm text-zinc-400 hover:text-white transition"
                        >
                            Sign out
                        </button>

                    </div>

                </nav>

                {/* Main */}
                <main className="max-w-6xl mx-auto px-6 py-12">

                    {/* Welcome */}
                    <div className="mb-10">

                        <p className="text-sm text-orange-400 mb-2">
                            Dashboard
                        </p>

                        <h2 className="text-4xl font-bold">
                            Welcome{user?.name ? `, ${user.name}` : ""}
                        </h2>

                        <p className="text-zinc-500 mt-3 max-w-xl">
                            Manage your insurance claims and use Forma AI
                            to turn your incident description into structured
                            claim information.
                        </p>

                    </div>

                    {/* Main Action */}
                    <div className="relative mb-8">

                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl blur opacity-10" />

                        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

                            <div className="max-w-2xl">

                                <p className="text-xs uppercase tracking-wider text-orange-400 mb-3">
                                    AI-powered claims
                                </p>

                                <h3 className="text-2xl font-bold mb-3">
                                    Start a new claim
                                </h3>

                                <p className="text-zinc-500 mb-6">
                                    Describe what happened in your own words.
                                    Forma AI will extract the relevant
                                    information and help you complete the
                                    claim form.
                                </p>

                                <Link
                                    to="/claim"
                                    className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-400 hover:via-amber-400 hover:to-rose-400 font-semibold transition"
                                >
                                    Create new claim
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <p className="text-sm text-zinc-500">
                                Account
                            </p>

                            <p className="text-lg font-semibold mt-2">
                                Active
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <p className="text-sm text-zinc-500">
                                AI Assistance
                            </p>

                            <p className="text-lg font-semibold mt-2">
                                Enabled
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <p className="text-sm text-zinc-500">
                                Signed in as
                            </p>

                            <p className="text-lg font-semibold mt-2 truncate">
                                {user?.email || "User"}
                            </p>
                        </div>

                    </div>

                </main>

            </div>

        </div>
    );


}

export default Dashboard;