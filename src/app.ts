import { MongoClient } from "mongodb";
import { Pool } from "pg";
import { MongoDBContactDataSource } from "./data/data-sources/mongodb/mongodb-contact-data-source";
import { PGContactDataSource } from "./data/data-sources/postgresql/pg-contact-data-source";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/nosql-database-wrapper";

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
