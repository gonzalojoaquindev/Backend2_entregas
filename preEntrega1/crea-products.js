// ************************************************************
// ************************************************************
// ************************************************************
// MODIFICAR STRING DE CONEXIÓN...!!! APUNTARLO A LA INSTANCIA
// DE MONGODB ATLAS PARTICULAR
// ************************************************************
// ************************************************************
// ************************************************************

import mongoose from 'mongoose';




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
        timestamps: true,
        collection: 'products'
    }
)
/* productSchema.plugin(paginate) */

export const productsModel = mongoose.model(
    "products", productSchema)

const conectar = async () => {
    try {
        await mongoose.connect('mongodb+srv://gonzaloact:20dejulio@cluster0.7b3o3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=backend2_entrega1')
        console.log(`Conexión a DB establecida`)


        let products = [
            {
                "title": "martillo",
                "description": "marca stanley",
                "code": 1,
                "price": 142371,
                "status": true,
                "stock": 2,
                "category": "herramientas"
            },
            {

                "title": "taladro",
                "description": "marca stanley",
                "code": 2,
                "price": 149873,
                "status": true,
                "stock": 2,
                "category": "herramientas"
            },
            {

                "title": "esmeril angular",
                "description": "marca stanley",
                "code": 3,
                "price": 28382,
                "status": true,
                "stock": 4,
                "category": "herramientas"
            },
            {

                "title": "atorinallor ph2",
                "description": "marca stanley",
                "code": 4,
                "price": 140666,
                "status": true,
                "stock": 2,
                "category": "herramientas"
            },
            {

                "title": "atornillador ph1",
                "description": "marca stanley",
                "code": 5,
                "price": 64329,
                "status": true,
                "stock": 20,
                "category": "herramientas"
            },
            {

                "title": "atornillador ph0",
                "description": "marca stanley",
                "code": 6,
                "price": 170487,
                "status": true,
                "stock": 4,
                "category": "herramientas"
            },
            {

                "title": "alicate cortante",
                "description": "marca knipef",
                "code": 7,
                "price": 80680,
                "status": true,
                "stock": 13,
                "category": "herramientas"
            },
            {

                "title": "alicate de punta",
                "description": "marca knipef",
                "code": 8,
                "price": 107549,
                "status": true,
                "stock": 2,
                "category": "herramientas"
            },
            {

                "title": "alicate universal",
                "description": "marca knipef",
                "code": 9,
                "price": 66123,
                "status": true,
                "stock": 4,
                "category": "herramientas"
            },
            {

                "title": "apreta terminales",
                "description": "marca knipef",
                "code": 10,
                "price": 115284,
                "status": false,
                "stock": 0,
                "category": "herramientas"
            },
            {

                "title": "cinta aisladora 33+",
                "description": "3M",
                "code": 11,
                "price": 53989,
                "status": true,
                "stock": 11,
                "category": "herramientas"
            },
            {

                "title": "serrucho",
                "description": "marca red line",
                "code": 12,
                "price": 97630,
                "status": true,
                "stock": 9,
                "category": "herramientas"
            },
            {

                "title": "cortador de pasto",
                "description": "marca bosh",
                "code": 13,
                "price": 116579,
                "status": true,
                "stock": 5,
                "category": "jardin"
            },
            {

                "title": "orilladora eléctrica",
                "description": "marca bosh",
                "code": 14,
                "price": 61137,
                "status": true,
                "stock": 1,
                "category": "jardin"
            },
            {
                "title": "motosierra",
                "description": "marca bosh",
                "code": 15,
                "price": 41704,
                "status": true,
                "stock": 8,
                "category": "jardin"
            },
            {

                "title": "teclado",
                "description": "marca logitech",
                "code": 16,
                "price": 50199,
                "status": true,
                "stock": 16,
                "category": "oficina"
            },
            {

                "title": "teclado inalambrico",
                "description": "marca logitech",
                "code": 17,
                "price": 170732,
                "status": true,
                "stock": 18,
                "category": "oficina"
            },
            {

                "title": "mouse",
                "description": "marca logitech",
                "code": 18,
                "price": 138181,
                "status": true,
                "stock": 9,
                "category": "oficina"
            },
            {

                "title": "monitor 32\"",
                "description": "marca logitech",
                "code": 19,
                "price": 107820,
                "status": true,
                "stock": 2,
                "category": "oficina"
            },
            {

                "title": "porta lapices",
                "description": "marca lapizlopez",
                "code": 20,
                "price": 77676,
                "status": true,
                "stock": 10,
                "category": "oficina"
            },
            {

                "title": "goma",
                "description": "marca lapizlopez",
                "code": 21,
                "price": 195129,
                "status": true,
                "stock": 20,
                "category": "oficina"
            },
            {

                "title": "lapicera azul",
                "description": "marca lapizlopez",
                "code": 22,
                "price": 103419,
                "status": true,
                "stock": 16,
                "category": "oficina"
            },
            {

                "title": "casco",
                "description": "marca heavywork",
                "code": 23,
                "price": 36664,
                "status": true,
                "stock": 11,
                "category": "proteccion personal"
            },
            {

                "title": "lentes",
                "description": "marca heavywork",
                "code": 24,
                "price": 174445,
                "status": true,
                "stock": 8,
                "category": "proteccion personal"
            },
            {

                "title": "guantes",
                "description": "marca heavywork",
                "code": 25,
                "price": 122071,
                "status": true,
                "stock": 6,
                "category": "proteccion personal"
            },
            {

                "title": "zapatos de seguridad",
                "description": "marca heavywork",
                "code": 26,
                "price": 179597,
                "status": true,
                "stock": 17,
                "category": "proteccion personal"
            },
            {

                "title": "chaleco geologo",
                "description": "marca heavywork",
                "code": 27,
                "price": 19799,
                "status": true,
                "stock": 13,
                "category": "proteccion personal"
            },
            {

                "title": "lentes de seguridad",
                "description": "marca heavywork",
                "code": 28,
                "price": 51035,
                "status": true,
                "stock": 9,
                "category": "proteccion personal"
            },
            {

                "title": "barbiquejo",
                "description": "marca heavywork",
                "code": 30,
                "price": 186907,
                "status": true,
                "stock": 16,
                "category": "proteccion personal"
            },
            {

                "title": "chaqueta termica",
                "description": "marca heavywork",
                "code": 31,
                "price": 98046,
                "status": true,
                "stock": 7,
                "category": "proteccion personal"
            },
            {

                "title": "pantalon outdoor",
                "description": "marca heavywork",
                "code": 32,
                "price": 173612,
                "status": true,
                "stock": 2,
                "category": "proteccion personal"
            },
            {

                "title": "legionario",
                "description": "marca heavywork",
                "code": 33,
                "price": 57228,
                "status": true,
                "stock": 6,
                "category": "proteccion personal"
            },
            {

                "title": "bloqueador solar",
                "description": "marca heavywork",
                "code": 34,
                "price": 80018,
                "status": true,
                "stock": 20,
                "category": "proteccion personal"
            },
            {

                "title": "guantes de nitrilo",
                "description": "marca heavywork",
                "code": 35,
                "price": 25732,
                "status": true,
                "stock": 19,
                "category": "proteccion personal"
            },
            {

                "title": "guantes dielectricos",
                "description": "marca heavywork",
                "code": 36,
                "price": 140076,
                "status": true,
                "stock": 9,
                "category": "proteccion personal"
            },
            {

                "title": "guantes hyflex",
                "description": "marca heavywork",
                "code": 37,
                "price": 78601,
                "status": true,
                "stock": 9,
                "category": "proteccion personal"
            },
            {

                "title": "pertica",
                "description": "marca atemic",
                "code": 38,
                "price": 190057,
                "status": true,
                "stock": 9,
                "category": "automovil"
            },
            {

                "title": "baliza",
                "description": "marca atemic",
                "code": 39,
                "price": 190088,
                "status": true,
                "stock": 5,
                "category": "automovil"
            },
            {

                "title": "luces faeneras",
                "description": "marca atemic",
                "code": 40,
                "price": 195416,
                "status": false,
                "stock": 0,
                "category": "automovil"
            },
            {

                "title": "cuñas",
                "description": "marca atemic",
                "code": 41,
                "price": 44822,
                "status": true,
                "stock": 11,
                "category": "automovil"
            },
            {

                "title": "foco h3",
                "description": "marca bosh",
                "code": 42,
                "price": 102585,
                "status": true,
                "stock": 7,
                "category": "automovil"
            },
            {

                "title": "foco h4",
                "description": "marca bosh",
                "code": 43,
                "price": 138814,
                "status": true,
                "stock": 5,
                "category": "automovil"
            },
            {

                "title": "foco h5",
                "description": "marca bosh",
                "code": 44,
                "price": 109347,
                "status": true,
                "stock": 6,
                "category": "automovil"
            },
            {

                "title": "foco h6",
                "description": "marca bosh",
                "code": 45,
                "price": 85054,
                "status": true,
                "stock": 18,
                "category": "automovil"
            },
            {

                "title": "foco h7",
                "description": "marca bosh",
                "code": 46,
                "price": 100649,
                "status": true,
                "stock": 7,
                "category": "automovil"
            },
            {

                "title": "cintas reflectantes",
                "description": "marca atemic",
                "code": 47,
                "price": 80733,
                "status": true,
                "stock": 1,
                "category": "automovil"
            },
            {

                "title": "barra antivuelco",
                "description": "marca atemic",
                "code": 48,
                "price": 154550,
                "status": true,
                "stock": 13,
                "category": "automovil"
            },
            {

                "title": "kit antiderrames",
                "description": "marca atemic",
                "code": 49,
                "price": 38429,
                "status": true,
                "stock": 19,
                "category": "automovil"
            }
        ]


        /*  products = products.map((product, indice) => product = { code: indice + 1, ...product }) */

        // console.log(usuarios)

        await productsModel.deleteMany()
        products = await productsModel.insertMany(products)
        /*   console.log(usuarios) */

        process.exit()

    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err.message}`)
    }
}

conectar();