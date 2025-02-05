import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    naam: string;
    email: string;
    avatar?: string;
    wachtwoord: string;
    favorieten: mongoose.Schema.Types.ObjectId[];
    comparePassword?: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    naam: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png" },
    wachtwoord: { type: String, required: true },
    favorieten: [{ type: mongoose.Schema.Types.ObjectId, ref: "Voertuig" }]
});

// Hash het wachtwoord voor opslag
userSchema.pre("save", async function (next) {
    if (!this.isModified("wachtwoord")) return next();
   this.wachtwoord = await bcrypt.hash(this.wachtwoord, 10);
 next();
  });

 // Methode om wachtwoord te vergelijken
  userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.wachtwoord);
  };
  
export default mongoose.model<IUser>("User", userSchema);