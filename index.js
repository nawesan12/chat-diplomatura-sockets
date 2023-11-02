const express = require("express")
const socket = require("socket.io")
const path = require("path")
const fs = require("fs")

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "public")))

const server = app.listen(PORT, () => {
  console.log("El servidor fue levantado en puerto 3000")
})

const io = socket(server)

let jugadores = []

io.on("connection", (socket) => {
  console.log(`Nuevo usuario conectado al socket: ${socket.id}`)
  io.sockets.emit("player:refresh", jugadores)

  socket.on("player:crear", (jugador) => {
    jugadores.push(jugador)
    console.log(jugadores)
    io.sockets.emit("player:crear", jugador)
  })

  socket.on("player:arriba", (jugador) => {
    io.sockets.emit("player:arriba", jugador)
  })

  socket.on("disconnect", (nombre) => {
    jugadores = jugadores.filter((jugador) => jugador.nombre !== nombre)
    io.sockets.emit("player:refresh", jugadores)
  })
})
