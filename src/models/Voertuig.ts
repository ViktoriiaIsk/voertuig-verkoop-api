import mongoose, { Schema } from "mongoose";

export interface IVoertuig {
    type: "auto" | "moto";
    merk: string;
    model: string;
    bouwjaar: number;
    prijs: number;
    cilinderinhoud?: number;
}

const voertuigSchema = new Schema<IVoertuig>({
    type: { type: String, enum: ["auto", "moto"], required: true },
    merk: { type: String, required: true },
    model: { type: String, required: true },
    bouwjaar: { type: Number, required: true },
    prijs: { type: Number, required: true },
    cilinderinhoud: {
        type: Number,
        required: function () {
            return (this as IVoertuig).type === "moto"; // Явное приведение типа
        }
    }
});

export default mongoose.model<IVoertuig>("Voertuig", voertuigSchema);
