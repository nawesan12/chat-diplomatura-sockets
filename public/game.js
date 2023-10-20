const socket = io()

const campoDeJugadores = document.querySelector(".players-container")
const formulario = document.getElementById("formulario")
const username = document.getElementById("username")
const color = document.getElementById("color")

formulario.addEventListener("submit", (e) => {
  e.preventDefault()

  socket.emit("player:crear", { username: username.value, color: color.value })
})

socket.on("player:refresh", (jugadores) => {
  campoDeJugadores.innerHTML = ""
  jugadores.forEach((jugador) => {
    campoDeJugadores.innerHTML += `<p style="color:${jugador.color}">${jugador.username}</p>`
  })
})

socket.on("player:crear", (jugador) => {
  campoDeJugadores.innerHTML += `<p style="color:${jugador.color}">${jugador.username}</p>`
})

window.addEventListener("close", () => {
  socket.emit("disconnect", username.value)
})

document.addEventListener("keypress", (evento) => {
  if(evento.key === "w") {
    socket.emit("player:arriba", username.value)
  }
})