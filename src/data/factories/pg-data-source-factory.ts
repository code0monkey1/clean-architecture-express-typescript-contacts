import { Pool } from "pg";
import { PGContactDataSource } from "../data-sources/postgresql/pg-contact-data-source";

export const getPgDataSource = async () => {
  const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "CONTACTSDB",
    password: "",
    port: 5432,
  });
  return new PGContactDataSource(db);
};
