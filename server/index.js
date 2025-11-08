import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors({ origin: "*" })); // tighten to your intranet origin later

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // tighten later
});

// demo file: server/positions.json (edit freely)
const readPositions = () => {
  try {
    const raw = fs.readFileSync(new URL("./positions.json", import.meta.url));
    return JSON.parse(raw.toString());
  } catch {
    return { btc: 30, sol: 20, lite: 40, eth: 10 };
  }
};

// health check
app.get("/health", (_req, res) => res.send("ok"));

io.on("connection", (socket) => {
  // Optional: verify auth here (cookie/JWT) before serving data
  socket.on("get_positions", (userId) => {
    // TODO: use userId to fetch user-specific data
    const positions = readPositions();
    socket.emit("positions", positions);
  });
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => console.log(`Socket.io server on :${PORT}`));
