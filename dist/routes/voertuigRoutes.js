"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const voertuigController_1 = require("../controllers/voertuigController");
const router = express_1.default.Router();
// Voertuigen routes
router.post("/", voertuigController_1.createVoertuig);
router.get("/", voertuigController_1.getVoertuigen);
router.get("/:id", voertuigController_1.getVoertuigById);
router.put("/:id", voertuigController_1.updateVoertuig);
router.delete("/:id", voertuigController_1.deleteVoertuig);
exports.default = router;
