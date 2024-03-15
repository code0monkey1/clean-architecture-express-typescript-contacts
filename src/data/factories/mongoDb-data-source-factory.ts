import { MongoClient } from "mongodb";
import { MongoDBContactDataSource } from "../data-sources/mongodb/mongodb-contact-data-source";
import { NoSQLDatabaseWrapper } from "../interfaces/data-sources/nosql-database-wrapper";

export const getMongoDbContactDataSource = async () => {
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
};
