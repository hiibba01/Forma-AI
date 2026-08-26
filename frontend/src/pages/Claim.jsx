import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, ArrowRight, LoaderCircle, AlertCircle, FileText, Brain, Lock, CheckCircle2 } from "lucide-react";
import API from "../api/axios.js";
import formaLogo from "../assets/formaa.png"

const Claim = () => {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await API.get("/forms/auto-insurance-claim");

                console.log("Backend response:", response.data);

                setForm(response.data.data);
            } catch (error) {
                console.error("Failed to fetch form:", error);
                setError("Unable to load your claim form.");
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <LoaderCircle size={52} className="text-orange-500 animate-spin mx-auto mb-6" />
                    <h2 className="text-xl font-semibold text-white">Preparing your claim</h2>
                    <p className="text-zinc-500 mt-2">Forma AI is preparing your form...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-zinc-900 border border-red-500/20 rounded-3xl p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-red-500/10 flex items-center justify-center">
                        <AlertCircle size={28} className="text-red-400" />
                    </div>

                    <h2 className="text-xl font-semibold text-white">Something went wrong</h2>

                    <p className="text-zinc-500 mt-2">{error}</p>
                </div>
            </div>
        );
    }

    const fields = form?.fields || [];

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">

            {/* Background Glow */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}

            <nav className="relative z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center">
                            <img src={formaLogo} alt="Forma AI Logo" className="w-full h-full object-contain" />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold">Forma AI</h1>
                            <p className="text-xs text-zinc-500">Intelligent Forms</p>
                        </div>
                    </div>

                    {/* AI Status */}

                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                        <span className="text-sm text-orange-300">AI Assistant Online</span>
                    </div>
                </div>
            </nav>

            {/* Main */}

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-14">

                {/* Hero */}

                <section className="text-center max-w-4xl mx-auto mb-14">

                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-rose-500/15 border border-orange-500/25">
                        <Sparkles size={18} className="text-orange-400" />
                        <span className="text-sm font-medium text-orange-300">AI-Powered Insurance Claims</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        File your claim
                        <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
                            without the paperwork.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                        Tell Forma AI what happened in your own words. Our AI understands your story and helps complete the information you need.
                    </p>
                </section>

                {/* Magic Input */}

                <section className="relative mb-10">

                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl blur opacity-20"></div>

                    <div className="relative bg-zinc-900 border border-orange-500/20 rounded-3xl p-6 md:p-8 shadow-2xl shadow-orange-500/5">

                        <div className="flex items-start gap-4 mb-6">

                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <Sparkles size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">Magic Input</h2>
                                <p className="text-sm text-zinc-500 mt-1">Describe the incident naturally. Forma AI will extract the details.</p>
                            </div>

                        </div>

                        <textarea placeholder="Example: I hit a deer on I-95 yesterday in my Honda, and the windshield shattered..." className="w-full min-h-40 resize-none rounded-2xl bg-zinc-950 border border-zinc-800 px-5 py-4 text-white placeholder:text-zinc-600 outline-none transition duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" />

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">

                            <div className="flex items-center gap-2 text-xs text-zinc-600">
                                <Brain size={15} className="text-orange-500" />
                                <span>AI extracts information from your story</span>
                            </div>

                            <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:via-amber-400 hover:to-orange-400 font-bold shadow-xl shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <Sparkles size={18} />
                                Extract with AI
                            </button>

                        </div>
                    </div>
                </section>

                {/* Stats */}

                <section className="grid md:grid-cols-3 gap-4 mb-12">

                    {/* Form */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500/20 transition">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <FileText size={19} className="text-orange-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-zinc-600">Form</p>
                                <p className="font-semibold mt-1 text-zinc-200">{form?.name || "Insurance Claim"}</p>
                            </div>
                        </div>

                    </div>

                    {/* Questions */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500/20 transition">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <FileText size={19} className="text-amber-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-zinc-600">Questions</p>
                                <p className="font-semibold text-2xl mt-1 text-white">{fields.length}</p>
                            </div>
                        </div>

                    </div>

                    {/* AI */}

                    <div className="bg-gradient-to-br from-orange-500/10 to-rose-500/5 border border-orange-500/20 rounded-2xl p-5">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <Brain size={19} className="text-orange-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-orange-500">Intelligence</p>
                                <p className="font-semibold mt-1 text-orange-300">AI Extraction Enabled</p>
                            </div>
                        </div>

                    </div>

                </section>

                {/* Claim Form */}

                <section>

                    <div className="flex items-end justify-between mb-6">

                        <div>
                            <p className="text-sm font-bold tracking-widest text-orange-500 mb-2">CLAIM DETAILS</p>

                            <h2 className="text-3xl font-bold">Tell us about the incident</h2>

                            <p className="text-zinc-500 mt-2">We'll only ask for what is necessary.</p>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-600">
                            <FileText size={15} />
                            <span>{fields.length} questions</span>
                        </div>

                    </div>

                    {/* Form Card */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">

                        {fields.length === 0 ? (

                            <div className="py-16 text-center">

                                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                                    <FileText size={25} className="text-orange-400" />
                                </div>

                                <p className="text-zinc-500">No form fields found.</p>

                            </div>

                        ) : (

                            <div className="grid md:grid-cols-2 gap-5">

                                {fields.map((field) => (

                                    <div key={field.id} className="group p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-200">

                                        <div className="flex items-center justify-between mb-3">

                                            <label className="font-semibold text-zinc-200">{field.label}</label>

                                            {field.required && (
                                                <span className="flex items-center gap-1 text-xs text-orange-400">
                                                    <CheckCircle2 size={13} />
                                                    Required
                                                </span>
                                            )}

                                        </div>

                                        <div className="h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center px-4 group-hover:border-zinc-700 transition">

                                            <span className="text-sm text-zinc-600">
                                                {field.type === "select"
                                                    ? "Select an option..."
                                                    : field.type === "date"
                                                        ? "Choose a date..."
                                                        : field.type === "checkbox"
                                                            ? "Checkbox"
                                                            : "Enter your answer..."
                                                }
                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>
                        )}

                        {/* Continue */}

                        {fields.length > 0 && (

                            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">

                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <Lock size={15} className="text-orange-500" />
                                    <span>Your information is securely processed.</span>
                                </div>

                                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 font-bold shadow-xl shadow-orange-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                    Continue
                                    <ArrowRight size={18} />
                                </button>

                            </div>

                        )}

                    </div>

                </section>
            </main>

            {/* Footer */}

            <footer className="relative z-10 border-t border-zinc-800 mt-14">

                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div className="flex items-center gap-2">
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center">
                            <img src={formaLogo} alt="Forma AI Logo" className="w-full h-full object-contain" />
                        </div>

                        <span className="text-sm font-semibold text-zinc-400">
                            Forma AI
                        </span>
                    </div>

                    <p className="text-sm text-zinc-600">
                        Forms that understand you.
                    </p>

                </div>

            </footer>

        </div>
    );
};

export default Claim;