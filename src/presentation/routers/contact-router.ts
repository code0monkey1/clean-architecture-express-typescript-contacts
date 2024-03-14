import express, { NextFunction, Request, Response } from "express";
import { CreateContactUseCase } from "../../domain/interfaces/use-cases/create-contact-use-case";
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/get-all-contacts-use-case";
import { ContactRequestModel } from "../../domain/models/contact";

export default function ContactsRouter(
  getAllContactsUseCase: GetAllContactsUseCase,
  createContactUseCase: CreateContactUseCase
) {
  const router = express.Router();

  router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      //[+] middleware
      try {
        // contactsMiddleware.isAdmin(req.body);
        next();
      } catch (e) {
        next(e);
      }
    },
    async (req: Request, res: Response) => {
      try {
        const contacts = await getAllContactsUseCase.execute();
        res.send(contacts);
      } catch (err) {
        res.status(500).send({ message: "Error fetching data" });
      }
    }
  );

  router.post("/", async (req: Request, res: Response) => {
    try {
      await createContactUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: "Error saving data" });
    }
  });

  return router;
}

export interface Middleware {
  isValid(data: unknown): ContactRequestModel | Error;
  isAdmin(contact: ContactRequestModel): boolean;
}

export class ContactsMiddleware implements Middleware {
  constructor(
    private readonly validation: Validation,
    private readonly admin: Auth
  ) {}
  isValid(data: unknown): ContactRequestModel | Error {
    return this.validation.execute(data);
  }
  isAdmin(contact: ContactRequestModel): boolean {
    return this.admin.execute(contact);
  }
}

export interface Validation {
  execute(data: unknown): ContactRequestModel | Error;
}

export interface Auth {
  execute(contact: ContactRequestModel): true | false;
}
