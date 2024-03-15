import { ContactDataSource } from "../../../data/interfaces/data-sources/contact-data-source";
import { ContactRepositoryImpl } from "../../../domain/repositories/contact-repository";
import { CreateContact } from "../../../domain/use-cases/contact/create-contact";

export const makeCreateContacts = (dataSource: ContactDataSource) => {
  const contactRepository = new ContactRepositoryImpl(dataSource);
  return new CreateContact(contactRepository);
};
