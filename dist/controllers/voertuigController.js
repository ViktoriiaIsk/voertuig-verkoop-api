"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVoertuig = exports.updateVoertuig = exports.getVoertuigById = exports.getVoertuigen = exports.createVoertuig = void 0;
const Voertuig_1 = __importDefault(require("../models/Voertuig"));
const mongoose_1 = require("mongoose");
const { ValidationError } = mongoose_1.Error;
const createVoertuig = async (req, res) => {
    try {
        const voertuig = new Voertuig_1.default(req.body);
        await voertuig.save();
        res.status(201).json(voertuig);
    }
    catch (error) {
        res.status(500).json({ message: "Fout bij het aanmaken van het voertuig." });
    }
};
exports.createVoertuig = createVoertuig;
const getVoertuigen = async (req, res) => {
    try {
        let filter = {}; // Object to store query filters
        // Filter by vehicle type (auto/moto)
        if (req.query.type) {
            filter.type = req.query.type;
        }
        // Filter by price range (minPrijs and maxPrijs)
        if (req.query.minPrijs || req.query.maxPrijs) {
            filter.prijs = {}; // Initialize price filter object
            // Minimum price filter
            if (req.query.minPrijs) {
                filter.prijs.$gte = Number(req.query.minPrijs);
            }
            // Maximum price filter
            if (req.query.maxPrijs) {
                filter.prijs.$lte = Number(req.query.maxPrijs);
            }
        }
        // Pagination: Default page is 1, default limit is 10
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Find vehicles with filters and pagination applied
        const voertuigen = await Voertuig_1.default.find(filter).skip(skip).limit(limit);
        // Count total documents (for frontend pagination)
        const total = await Voertuig_1.default.countDocuments(filter);
        res.json({
            total, // Total number of vehicles
            page, // Current page number
            pages: Math.ceil(total / limit), // Total pages available
            voertuigen, // Filtered vehicles
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving vehicles." });
    }
};
exports.getVoertuigen = getVoertuigen;
const getVoertuigById = async (req, res) => {
    try {
        const voertuig = await Voertuig_1.default.findById(req.params.id);
        if (!voertuig) {
            res.status(404).json({ message: "Voertuig niet gevonden." });
            return;
        }
        res.json(voertuig);
    }
    catch (error) {
        res.status(500).json({ message: "Fout bij het ophalen van het voertuig." });
    }
};
exports.getVoertuigById = getVoertuigById;
const updateVoertuig = async (req, res) => {
    try {
        const voertuig = await Voertuig_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!voertuig) {
            res.status(404).json({ message: "Voertuig niet gevonden." });
            return;
        }
        res.json(voertuig);
    }
    catch (error) {
        res.status(500).json({ message: "Fout bij het bijwerken van het voertuig." });
    }
};
exports.updateVoertuig = updateVoertuig;
const deleteVoertuig = async (req, res) => {
    try {
        const voertuig = await Voertuig_1.default.findByIdAndDelete(req.params.id);
        if (!voertuig) {
            res.status(404).json({ message: "Voertuig niet gevonden." });
            return;
        }
        res.json({ message: "Voertuig verwijderd." });
    }
    catch (error) {
        res.status(500).json({ message: "Fout bij het verwijderen van het voertuig." });
    }
};
exports.deleteVoertuig = deleteVoertuig;
