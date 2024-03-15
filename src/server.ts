import express from "express";
import { Config } from "./config";
import logger from "./config/logger";
const server = express();

server.use(express.json());

if (Config.NODE_ENV !== "test") {
  const PORT = Config.PORT;

  server.listen(PORT, () => {
    logger.info("Server listening on port", PORT);
  });
}
export default server;
