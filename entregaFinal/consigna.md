Primera pre entrega

* [X] ~~*Crear un modelo User el cual contará con los campos:*~~ [2024-11-13]
    first_name:String,
    last_name:String,
    email:String (único)
    age:Number,
    password:String(Hash)
    cart:Id con referencia a Carts
    role:String(default:’user’)
* [X] ~~*Encriptar la contraseña del usuario mediante el paquete bcrypt (Utilizar el método “hashSync”).*~~ [2024-11-13]
* [X] ~~*Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios*~~ [2024-11-13]
* [X] ~~*Implementar un sistema de login del usuario que trabaje con jwt.*~~ [2024-11-13] 
* [X] ~~*Desarrollar una estrategia “current” para extraer la cookie que contiene el token y con dicho token obtener el usuario asociado. En caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.*~~ [2024-10-22]
* [X] ~~*Agregar al router /api/sessions/ la ruta /current, la cual validará al usuario logueado y devolverá en una respuesta sus datos (Asociados al JWT).*~~ [2024-11-13]
* [X] ~~*Link al repositorio de Github con el proyecto completo, sin la carpeta de Node_modules.*~~ [2024-11-13]


Entrega Final

Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:
* [x] Sólo el administrador puede crear, actualizar y eliminar productos.
* [x] Sólo el usuario puede agregar productos a su carrito.

* [X] ~~*Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos*~~ [2024-11-15]
Id (autogenerado por mongo)
code: String debe autogenerarse y ser único
purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at) (compra)
amount: Number, total de la compra.
purchaser: String, contendrá el correo del usuario asociado al carrito. (comprador)


* [X] ~~*Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.*~~ [2024-11-15]
* [X] ~~*La compra debe corroborar el stock del producto al momento de finalizarse*~~ [2024-11-15]
* [X] ~~*Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.*~~ [2024-11-15]
* [X] ~~*Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra.*~~ [2024-11-15] 

* [ ] Link al repositorio de Github con el proyecto (sin node_modules)
* [ ] Además, archivo .env para poder correr el proyecto.



Dudas

Que es la estrategia current?

Como hago el ticket?
