// server side
// implementation from https://jaygould.co.uk/2020-10-24-big-data-pt-2-socket-progress-bar/
// npm install socket.io

import {app} from "./app"

const sockets = {}
const server = app.listen(app.get("port"), () => {} )
const io = require("socket.io")(server)

io.on("connection", (socket) => {
    console.log(`client connected: ${socket.id}`)
    socket.on("connectInit", (sessionId) => {
        socket[sessionId] = socket.id
        app.set("sockets", sockets)
    })
})

//the io instance is set in express so it can be grapped in a route

app.set("io", io)