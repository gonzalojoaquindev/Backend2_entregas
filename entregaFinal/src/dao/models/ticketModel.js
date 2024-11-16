import mongoose from "mongoose";

export const ticketModel = mongoose.model(
    "tickets",
    new mongoose.Schema(
        {
            code: String,
            purchase_datetime: Date,
            purchaser: String,
            amount: Number,
            detalle: {
                type: []
            }
        },
        { timestamps: true }
    )
)