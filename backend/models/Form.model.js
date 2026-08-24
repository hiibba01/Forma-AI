import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
    {
        formId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        version: {
            type: Number,
            default: 1
        },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        }
    }, { timestamps: true}
);


const Form = mongoose.model("Form", formSchema);

export default Form;