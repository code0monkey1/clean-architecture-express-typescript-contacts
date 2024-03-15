import express from "express";

const app = express();

import "express-async-errors";

import { contactsRouterFactory } from "./presentation/factories/contact/contact-router-factory";

import { getMongoDbContactDataSource } from "./data/factories/mongoDb-data-source-factory";

(async () => {
  const dataSource = await getMongoDbContactDataSource();

  const contactRouter = contactsRouterFactory(dataSource);

  app.use("/contact", contactRouter);
})();

export default app;
