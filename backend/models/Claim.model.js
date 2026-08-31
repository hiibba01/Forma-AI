import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
    {
        formId: {
            type: String,
            required: true
        },

        data: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    }, { timestamps: true }
);

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;