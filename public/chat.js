const socket = io()

const mensaje = document.getElementById("mensaje")
const username = document.getElementById("username")
const enviar = document.getElementById("enviar")
const listaDeMensajes = document.getElementById("output")
const escribiendo = document.getElementById("escribiendo")

enviar.addEventListener("click", () => {
  socket.emit("chat:mensaje", { usuario: username.value, contenido: mensaje.value })

  mensaje.value = ""
})

mensaje.addEventListener("keypress", () => {
  socket.emit("chat:escribiendo", username.value)
})

socket.on("chat:mensaje", (mensaje) => {
  listaDeMensajes.innerHTML += `<p> ${mensaje.usuario}: ${mensaje.contenido}</p>`
})

socket.on("chat:escribiendo", (datos) => {
  console.log("Evento recibido")
  escribiendo.innerHTML = `<p>${datos}</p> esta escribiendo...`
})