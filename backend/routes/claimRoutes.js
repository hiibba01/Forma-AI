import express from "express";
import { submitClaim } from "../controllers/claimController.js";

const router = express.Router();

router.post("/", submitClaim);

export default router;