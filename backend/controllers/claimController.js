import Claim from "../models/Claim.model.js";
import  { toFile } from "@imagekit/nodejs";
import imagekit from "../config/imagekit.js";


export const submitClaim = async (req, res) => {

    try {

        const { formId, data } = req.body;

        if (!formId || !data) {
            return res.status(400).json({
                success: false,
                message: "formId and data are required."
            });
        }

        let parsedData;

        try {
            parsedData = JSON.parse(data);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid claim data."
            });
        }

        const evidence = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {

                console.log("Upload method:", typeof imagekit?.files?.upload);
                
                const result = await imagekit.files.upload({
                    file: await toFile(
                        file.buffer,
                        file.originalname
                    ),
                    fileName: file.originalname,
                    folder: "/forma-ai/claims",
                    useUniqueFileName: true,
                    isPrivateFile: true
                });

                evidence.push({
                url: result.url,
                fileId: result.fileId,
                publicId: result.fileId, // Add this line
                filePath: result.filePath,
                resourceType: file.mimetype.startsWith("video/")
                    ? "video"
                    : "image",
                originalName: file.originalname
            });
            }
        }

        const claim = await Claim.create({
            userId: req.user._id,
            formId,
            data: parsedData,
            evidence
        });

        res.status(201).json({
            success: true,
            message: "Claim submitted successfully.",
            data: claim
        });

    } catch (error) {
        console.error("Claim submission error:", {
            message: error.message,
            status: error.status,
            name: error.name
        });

        res.status(500).json({
            success: false,
            message: "Failed to submit claim!"
        });
    }
};

export const getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: claims
        });

    } catch (error) {
        console.error("Fetch claims error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch claims."
        });
    }
};