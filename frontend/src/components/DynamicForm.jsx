import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";

const DynamicForm = ({ fields,  extractedData }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        mode: "onSubmit"
    });

    useEffect(() => {
    if (!extractedData) {
        return;
    }

    Object.entries(extractedData).forEach(([fieldId, value]) => {
        setValue(fieldId, value);
        });
    }, [extractedData, setValue]);

    const values = watch();

    const shouldShowField = (field) => {
        if (!field.showIf || !field.showIf.field) {
            return true;
        }

        const currentValue = values[field.showIf.field];

        return currentValue === field.showIf.value;
    };

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };

    if (!fields || fields.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-zinc-500">No form fields available.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-5">
                {fields.map((field) => {
                    if (!shouldShowField(field)) {
                        return null;
                    }

                    return (
                        <div key={field.id} className="group p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-orange-500/30 transition-all duration-200">

                            <div className="flex items-center justify-between mb-3">
                                <label htmlFor={field.id} className="font-semibold text-zinc-200">
                                    {field.label}
                                </label>

                                {field.required && (
                                    <span className="flex items-center gap-1 text-xs text-orange-400">
                                        <CheckCircle2 size={13} />
                                        Required
                                    </span>
                                )}
                            </div>

                            {field.type === "text" && (
                                <input id={field.id} type="text" placeholder={field.placeholder || "Enter your answer..."} {...register(field.id, { required: field.required && shouldShowField(field) ? `Please answer: ${field.label}` : false })} className="w-full h-12 rounded-xl bg-zinc-900 border border-zinc-800 px-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" />
                            )}

                            {field.type === "textarea" && (
                                <textarea id={field.id} placeholder={field.placeholder || "Enter your answer..."} {...register(field.id, { required: field.required && shouldShowField(field) ? `Please answer: ${field.label}` : false })} className="w-full min-h-32 resize-none rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" />
                            )}

                            {field.type === "select" && (
                                <div className="relative">
                                    <select id={field.id} {...register(field.id, { required: field.required && shouldShowField(field) ? `Please answer: ${field.label}` : false })} className="w-full h-12 appearance-none rounded-xl bg-zinc-900 border border-zinc-800 px-4 pr-10 text-white outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10">
                                        <option value="">Select an option...</option>

                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                                </div>
                            )}

                            {field.type === "date" && (
                                <input id={field.id} type="date" {...register(field.id, { required: field.required && shouldShowField(field) ? `Please answer: ${field.label}` : false })} className="w-full h-12 rounded-xl bg-zinc-900 border border-zinc-800 px-4 text-white outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" />
                            )}

                            {field.type === "checkbox" && (
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input id={field.id} type="checkbox" {...register(field.id, { required: field.required && shouldShowField(field) ? `Please answer: ${field.label}` : false })} className="w-5 h-5 accent-orange-500" />

                                    <span className="text-sm text-zinc-400">
                                        {field.description || field.label}
                                    </span>
                                </label>
                            )}

                            {errors[field.id] && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors[field.id].message}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <span>Your information is securely processed.</span>
                </div>

                <button type="submit" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 font-bold shadow-xl shadow-orange-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    Submit Claim
                </button>
            </div>
        </form>
    );
};

export default DynamicForm;