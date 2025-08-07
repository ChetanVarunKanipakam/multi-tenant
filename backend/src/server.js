const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

mongoose.connect(process.env.MONGO_URI).then(() => {

  console.log("MongoDB connected");

  // Make io accessible via app context
  app.set("io", io);

  server.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
