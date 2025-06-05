const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: { origin: "*" }
});

let clients = {};

io.on("connection", (socket) => {
  console.log("✅ Connected:", socket.id);

  socket.on("register", (id) => {
    clients[id] = socket;
    console.log("📍 Registered:", id);
  });

  socket.on("send-command", ({ to, cmd }) => {
    if (clients[to]) {
      clients[to].emit("command", cmd);
      console.log(`📤 Command sent to ${to}: ${cmd}`);
    }
  });

  socket.on("disconnect", () => {
    for (let key in clients) {
      if (clients[key] === socket) {
        delete clients[key];
        break;
      }
    }
  });
});
