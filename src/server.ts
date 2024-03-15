import express from "express";
import logger from "./config/logger";
const server = express();

server.use(express.json());
const PORT = 3000;

server.listen(PORT, () => {
  logger.info("server listening on port ", PORT);
});

export default server;
