// alert("Bienvenidos...!!!")

const inputEmail = document.getElementById("email")
const inputPass = document.getElementById("password")
const btnSubmit = document.getElementById("btnSubmit")

const divVillanos = document.getElementById("divVillanos")
const aVillanos = document.getElementById("aVillanos")

btnSubmit.addEventListener("click", async (e) => {
    e.preventDefault()

    let email = inputEmail.value
    let password = inputPass.value
    if (!email || !password) {
        alert("Complete datos...!!!")
        return
    }
    console.log(email, password)
    const body = { email, password }

    let respuesta = await fetch("/api/sessions/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    if (respuesta.status >= 400) {
        let { error } = await respuesta.json()
        alert(error)
        return
    } else {
        let datos = await respuesta.json()
        console.log(datos)
        /* localStorage.setItem("token", datos.token) */
    }
})

aVillanos.addEventListener("click", async (e) => {
    e.preventDefault()
    console.log(divVillanos)
    divVillanos.textContent = ""

    let respuesta = await fetch("/api/villanos", {
        /* headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        } */
    })
    if (respuesta.status >= 400) {
        /* let { error } = await respuesta.json()
        divVillanos.textContent = error */
        divVillanos.textContent = "No tiene permisos para ver los villanos"
    } else {
        let { villanos } = await respuesta.json()
        console.log(villanos)
        let ulVillanos = document.createElement("ul")
        villanos.forEach(villano => {
            let li = document.createElement("li")
            li.textContent = villano.name
            ulVillanos.append(li)

        });
        divVillanos.append(ulVillanos)
    }

})