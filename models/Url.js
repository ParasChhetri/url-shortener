import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortCode : String, // this stores the unique short identifier for a long URL
    longUrl : String, // this stores original long URL
},{timestamps: true});

// here "Url" is the name of the model
export const Url = new mongoose.model("Url",urlSchema)
