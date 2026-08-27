import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const fieldSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },

        label: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["text", "textarea", "select", "date", "checkbox"],
            required: true
        },

        required: {
            type: Boolean,
            default: false
        },

        placeholder: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        showIf: {
            field: {
                type: String,
                default: null
            },

            value: {
                type: mongoose.Schema.Types.Mixed,
                default: null
            }
        },

        options: {
            type: [optionSchema],
            default: []
        }
    },
    { _id: false }
);

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
        },

        fields: {
            type: [fieldSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Form = mongoose.model("Form", formSchema);

export default Form;