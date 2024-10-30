const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("send-location", function (data) {
    io.emit("receive-location", {
      id: socket.id,
      ...data,
    });
  });

  socket.on("disconnect", function () {
    io.emit("user-disconnected", {
      id: socket.id,
    });
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(process.env.PORT, () => {});
