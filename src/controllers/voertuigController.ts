import { Request, Response } from "express";
import Voertuig from "../models/Voertuig";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;


export const createVoertuig = async (req: Request, res: Response): Promise<void> => {
  try {
      const voertuig = new Voertuig(req.body);
      await voertuig.save();
      res.status(201).json(voertuig);
  } catch (error) {
      res.status(500).json({ message: "Fout bij het aanmaken van het voertuig." });
  }
};

export const getVoertuigen = async (req: Request, res: Response) => {
    try {
        let filter: any = {}; // Object to store query filters

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
        const voertuigen = await Voertuig.find(filter).skip(skip).limit(limit);

        // Count total documents (for frontend pagination)
        const total = await Voertuig.countDocuments(filter);

        res.json({
            total,                // Total number of vehicles
            page,                 // Current page number
            pages: Math.ceil(total / limit), // Total pages available
            voertuigen,           // Filtered vehicles
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving vehicles." });
    }
};


export const getVoertuigById = async (req: Request, res: Response): Promise<void> => {
  try {
      const voertuig = await Voertuig.findById(req.params.id);
      if (!voertuig) {
          res.status(404).json({ message: "Voertuig niet gevonden." });
          return;
      }
      res.json(voertuig);
  } catch (error) {
      res.status(500).json({ message: "Fout bij het ophalen van het voertuig." });
  }
};

export const updateVoertuig = async (req: Request, res: Response): Promise<void> => {
  try {
      const voertuig = await Voertuig.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!voertuig) {
          res.status(404).json({ message: "Voertuig niet gevonden." });
          return;
      }
      res.json(voertuig);
  } catch (error) {
      res.status(500).json({ message: "Fout bij het bijwerken van het voertuig." });
  }
};

export const deleteVoertuig = async (req: Request, res: Response): Promise<void> => {
  try {
      const voertuig = await Voertuig.findByIdAndDelete(req.params.id);
      if (!voertuig) {
          res.status(404).json({ message: "Voertuig niet gevonden." });
          return;
      }
      res.json({ message: "Voertuig verwijderd." });
  } catch (error) {
      res.status(500).json({ message: "Fout bij het verwijderen van het voertuig." });
  }
};

