import mongoose from "mongoose";

export const villanosModel = mongoose.model(
    "villanos",
    new mongoose.Schema(
        {
            nombre: String,
            /*  email: { type: String, unique: true }, */
            password: String
        },
        {
            timestamps: true,
        }
    )
)