import mongoose from "mongoose";

export const heroesModel = mongoose.model(
    "heroes",
    new mongoose.Schema(
        {
            name: {
                type: String,
                unique: true
            },
            alias: String
        },
        {
            timestamps: true
        }
    )
)