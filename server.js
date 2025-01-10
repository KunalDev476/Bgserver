const { Server } = require("socket.io");
const http = require("http");

let io;
let color = "white"; // Shared state for all connections

const handler = (req, res) => {
  if (!io) {
    const server = http.createServer();
    io = new Server(server);

    io.on("connection", (socket) => {
      console.log("A user connected");

      // Send the current color to the client
      socket.emit("colorUpdate", color);

      // Listen for color updates
      socket.on("updateColor", (newColor) => {
        color = newColor;
        io.emit("colorUpdate", color);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    // Bind the Socket.IO server
    server.listen(0, () => console.log("Socket.IO is running"));
  }

  res.status(200).send("Socket.IO server is running on Vercel.");
};

module.exports = handler;
