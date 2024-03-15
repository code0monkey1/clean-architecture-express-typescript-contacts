import { ContactDataSource } from "../../../data/interfaces/data-sources/contact-data-source";
import ContactsRouter from "../../routers/contact-router";
import { makeCreateContacts } from "../use-cases/create-contacts-factory";
import { makeGetAllContacts } from "../use-cases/get-all-contacts-factory";

export const contactsRouterFactory = (dataSource: ContactDataSource) => {
  const getAllContactsUseCase = makeGetAllContacts(dataSource);

  const createContactUseCase = makeCreateContacts(dataSource);

  return ContactsRouter(getAllContactsUseCase, createContactUseCase);
};
