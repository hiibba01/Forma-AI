import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        formId: {
            type: String,
            required: true
        },

        data: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },

        evidence: [
            {
                url: {
                    type: String,
                    required: true
                },

                publicId: {
                    type: String,
                    required: true
                },

                resourceType: {
                    type: String,
                    required: true
                },

                originalName: {
                    type: String
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;