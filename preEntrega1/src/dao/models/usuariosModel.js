import mongoose from 'mongoose'

const usuarioSchema = mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        email: {
            type: String, unique: true
        },
        age: Number,
        password: String,
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts"
        },
        rol: { type: String, default: "user" }
    },
    { timestamps: true }
)

usuarioSchema.pre("findOne", function () {
    this.populate("cart").lean()
})

export const usuariosModel = mongoose.model(
    "usuarios", usuarioSchema
)
/* Crear un modelo User el cual contará con los campos: */
/* export const usuariosModel = mongoose.model('usuarios', new mongoose.Schema({
}))

usuariosModel.pre("findOne", function () {
    this.populate("")
}) */
/* 
first_name:String,
    last_name:String,
    email:String (único)
    age:Number,
    password:String(Hash)
    cart:Id con referencia a Carts
    role:String(default:’user’)

*/