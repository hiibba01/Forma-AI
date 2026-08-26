import { useEffect, useState } from "react";
import API from "../api/axios.js";

const Claim = () => {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await API.get(
                    "/forms/auto-insurance-claim"
                );

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
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>

                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                    </div>

                    <h2 className="text-xl font-semibold text-white">
                        Preparing your claim
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Loading your personalized form...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white/5 border border-red-500/20 rounded-3xl p-8 text-center backdrop-blur-xl">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-red-500/10 flex items-center justify-center">
                        <span className="text-2xl">!</span>
                    </div>

                    <h2 className="text-xl font-semibold text-white">
                        Something went wrong
                    </h2>

                    <p className="text-slate-400 mt-2">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    const fields = form?.fields || [];

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

            {/* Background gradients */}
            <div className="fixed inset-0 pointer-events-none">

                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

            </div>

            {/* Navbar */}
            <nav className="relative z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <span className="font-bold text-lg">
                                F
                            </span>
                        </div>

                        <div>
                            <h1 className="font-bold text-lg tracking-tight">
                                Forma AI
                            </h1>

                            <p className="text-xs text-slate-500">
                                Intelligent Forms
                            </p>
                        </div>

                    </div>

                    {/* Status */}
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">

                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>

                        <span className="text-sm text-blue-300">
                            AI Assistant Online
                        </span>

                    </div>

                </div>

            </nav>

            {/* Main */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">

                {/* Hero */}
                <section className="text-center max-w-3xl mx-auto mb-12">

                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20">

                        <span>✦</span>

                        <span className="text-sm font-medium text-blue-300">
                            AI-Powered Insurance Claims
                        </span>

                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">

                        File your claim

                        <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                            without the paperwork.
                        </span>

                    </h1>

                    <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                        Tell Forma AI what happened in your own words.
                        Our AI will understand your story and help
                        complete the necessary information for you.
                    </p>

                </section>

                {/* Magic Input */}
                <section className="relative mb-10">

                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-3xl blur opacity-20"></div>

                    <div className="relative bg-slate-900/90 border border-blue-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl">

                        <div className="flex items-start gap-4 mb-6">

                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                                <span className="text-xl">
                                    ✦
                                </span>

                            </div>

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Magic Input
                                </h2>

                                <p className="text-sm text-slate-400 mt-1">
                                    Describe what happened naturally.
                                    Forma AI will extract the details.
                                </p>

                            </div>

                        </div>

                        <textarea
                            placeholder="Example: I hit a deer on I-95 yesterday in my Honda, and the windshield shattered..."
                            className="w-full min-h-36 resize-none rounded-2xl bg-slate-950/80 border border-slate-700 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">

                            <p className="text-xs text-slate-500">
                                AI extracts information from your description.
                            </p>

                            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5">
                                ✦ Extract with AI
                            </button>

                        </div>

                    </div>

                </section>

                {/* Form information */}
                <section className="grid md:grid-cols-3 gap-4 mb-10">

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                        <p className="text-sm text-slate-500">
                            Form
                        </p>

                        <p className="font-semibold mt-1">
                            {form?.name || "Insurance Claim"}
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                        <p className="text-sm text-slate-500">
                            Questions
                        </p>

                        <p className="font-semibold mt-1">
                            {fields.length}
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                        <p className="text-sm text-slate-500">
                            AI Assistance
                        </p>

                        <p className="font-semibold text-blue-400 mt-1">
                            Enabled
                        </p>
                    </div>

                </section>

                {/* Dynamic form preview */}
                <section>

                    <div className="flex items-end justify-between mb-5">

                        <div>
                            <p className="text-sm text-blue-400 font-medium mb-1">
                                CLAIM DETAILS
                            </p>

                            <h2 className="text-2xl font-bold">
                                Tell us about the incident
                            </h2>
                        </div>

                        <div className="hidden sm:block text-sm text-slate-500">
                            {fields.length} questions
                        </div>

                    </div>

                    <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">

                        {fields.length === 0 ? (
                            <div className="py-12 text-center">

                                <p className="text-slate-400">
                                    No form fields found.
                                </p>

                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-5">

                                {fields.map((field) => (

                                    <div
                                        key={field.id}
                                        className="group p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/30 transition-all duration-200"
                                    >

                                        <div className="flex items-center justify-between mb-3">

                                            <label className="font-medium text-slate-200">
                                                {field.label}
                                            </label>

                                            {field.required && (
                                                <span className="text-xs text-blue-400">
                                                    Required
                                                </span>
                                            )}

                                        </div>

                                        <div className="h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center px-4">

                                            <span className="text-sm text-slate-600">
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

                        {/* Continue button */}
                        {fields.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

                                <p className="text-sm text-slate-500">
                                    Your information is securely processed.
                                </p>

                                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-0.5">
                                    Continue →
                                </button>

                            </div>
                        )}

                    </div>

                </section>

            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 mt-12">

                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-slate-600">
                        © 2026 Forma AI
                    </p>

                    <p className="text-sm text-slate-600">
                        Intelligent workflows. Simplified.
                    </p>

                </div>

            </footer>

        </div>
    );
};

export default Claim; 