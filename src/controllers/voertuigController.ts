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

export const getVoertuigen = async (req: Request, res: Response): Promise<void> => {
  try {
      const voertuigen = await Voertuig.find();
      res.json(voertuigen);
  } catch (error) {
      res.status(500).json({ message: "Fout bij het ophalen van voertuigen." });
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

