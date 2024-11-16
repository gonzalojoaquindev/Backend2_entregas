import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2'


const productSchema = new mongoose.Schema(
    {
        id: Number,
        title: {
            type: String, unique: true
        },
        description: String,
        code: String,
        price: Number,
        status: Boolean,
        stock: Number,
        category: String,
    },
    {
        timestamps: true
    }
)
productSchema.plugin(paginate)

export const productModel = mongoose.model(
    "products", productSchema)

