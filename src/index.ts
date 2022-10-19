import "reflect-metadata";
import logger from "./logger";
import app from "./app";
import db from "./db";

const SERVER_PORT = 5000;

const main = async () => {
  await app.listen(SERVER_PORT);
};

main()
  .then(() => {
    logger.debug(`Server is up at http://localhost:${SERVER_PORT}`);
  })
  .catch(() => {
    db.$disconnect();
  });
