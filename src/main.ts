import { MongoClient } from "mongodb";
import { Pool } from "pg";
import { MongoDBContactDataSource } from "./data/data-sources/mongodb/mongodb-contact-data-source";
import { PGContactDataSource } from "./data/data-sources/postgresql/pg-contact-data-source";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/nosql-database-wrapper";
import { ContactRequestModel } from "./domain/models/contact";
import { ContactRepositoryImpl } from "./domain/repositories/contact-repository";
import { CreateContact } from "./domain/use-cases/contact/create-contact";
import { GetAllContacts } from "./domain/use-cases/contact/get-all-contacts";
import ContactRouter from "./presentation/routers/contact-router";
import server from "./server";
import { Response, Request, NextFunction } from "express";
async function getMongoDS() {
  const client: MongoClient = new MongoClient(
    "mongodb://localhost:27017/contacts"
  );
  await client.connect();
  const db = client.db("CONTACTS_DB");

  const contactDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("contacts").find(query).toArray(),
    insertOne: (doc) => db.collection("contacts").insertOne(doc),
    deleteOne: (id: String) => db.collection("contacts").deleteOne({ _id: id }),
    updateOne: (id: String, data: object) =>
      db.collection("contacts").updateOne({ _id: id }, data),
  };

  return new MongoDBContactDataSource(contactDatabase);
}

async function getPGDS() {
  const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "CONTACTSDB",
    password: "",
    port: 5432,
  });
  return new PGContactDataSource(db);
}
const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {};
};

(async () => {
  const dataSource = await getPGDS();

  const contactRouter = ContactRouter(
    new GetAllContacts(new ContactRepositoryImpl(dataSource)),
    new CreateContact(new ContactRepositoryImpl(dataSource))
  );

  server.use("/contact", auth, contactRouter);

  server.listen(4000, () => console.log("Running on http://localhost:4000"));
})();
