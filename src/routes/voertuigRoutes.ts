import express from "express";
import { createVoertuig, getVoertuigen, getVoertuigById, updateVoertuig, deleteVoertuig } from "../controllers/voertuigController";

const router = express.Router();

// Voertuigen routes
router.post("/", createVoertuig);
router.get("/", getVoertuigen);
router.get("/:id", getVoertuigById);
router.put("/:id", updateVoertuig);
router.delete("/:id", deleteVoertuig);

export default router;
