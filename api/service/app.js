import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import initializeRoutes from "./routers/index.js";


const initialize = (app) => {
    console.log("App IS started ");
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MongoDB connected successfully.");
})
.catch((error) => {
    console.error("MongoDB connection error:", error.message);
});
initializeRoutes(app);
}

export default initialize;