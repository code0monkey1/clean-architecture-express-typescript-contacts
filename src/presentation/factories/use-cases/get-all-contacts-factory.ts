import { ContactDataSource } from "../../../data/interfaces/data-sources/contact-data-source";
import { ContactRepositoryImpl } from "../../../domain/repositories/contact-repository";
import { GetAllContacts } from "../../../domain/use-cases/contact/get-all-contacts";

export const makeGetAllContacts = (dataSource: ContactDataSource) => {
  const contactRepository = new ContactRepositoryImpl(dataSource);
  return new GetAllContacts(contactRepository);
};
