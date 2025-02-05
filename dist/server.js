"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const notFoundController_1 = require("./controllers/notFoundController");
const mongoose_1 = __importDefault(require("mongoose"));
const voertuigRoutes_1 = __importDefault(require("./routes/voertuigRoutes"));
// Variables
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/voertuig", voertuigRoutes_1.default);
app.all("*", notFoundController_1.notFound);
// Database connection
// Database connection
async function connectDB() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Database connection OK");
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
connectDB().then(() => {
    // Server Listening
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}!`);
    });
});
