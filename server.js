const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store the current color
let color = "white";

// Serve a basic route
app.get("/", (req, res) => {
  res.send("Socket.IO server is running!");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the current color to the newly connected client
  socket.emit("colorUpdate", color);

  // Listen for color updates from the client
  socket.on("updateColor", (newColor) => {
    color = newColor; // Update the color on the server
    io.emit("colorUpdate", color); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server is running at http://localhost:${PORT}`);
});
