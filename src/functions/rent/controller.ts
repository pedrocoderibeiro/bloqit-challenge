import { Request, Response } from "express";
import getRent from "./get/getRent";
import { RentQueryParams } from "src/schemas/getSchema";
import getRents from "./get/getRents";
import postRent from "./post/postRent";
import putRent from "./put/putRent";
import deleteRent from "./delete/deleteRent";
import { GetError, PutRentError } from "@enums/error";
import { Rent } from "@entities/rent.model";

class rentController {
  getRent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const rent = await getRent(id);
    if (rent) res.send(rent);
    else res.status(404).json({ error: "Rent not found" });
  };
  getRents = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as RentQueryParams;
    const response = await getRents(queryParams);
    res.send(response.data);
  };
  createRent = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await postRent(body);
    res.send(response.data);
  };
  updateRent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const response = await putRent(id, body);

    if (!response.success) {
      if (
        typeof response.data === "string" &&
        Object.values(PutRentError).includes(response.data as PutRentError)
      ) {
        const errorType = response.data as PutRentError;

        switch (errorType) {
          case PutRentError.RentNotFound:
            res.status(404).send("Rent not found");
            break;
          case PutRentError.LockerNotFound:
            res.status(404).send("Locker not found");
            break;
          case PutRentError.Conflict:
            res
              .status(404)
              .send("Dropoff date cannot be superior to pickup date");
            break;
          default:
            break;
        }
        return;
      } else {
        console.error("Unexpected error data type:", response.data);
        res.status(500).send("Internal Server Error"); // Or send a generic error response
      }
    }

    res.send(response.data);
  };
  deleteRent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const response = await deleteRent(id);

    if (!response.success) {
      if (
        typeof response.data === "string" &&
        Object.values(GetError).includes(response.data as GetError)
      ) {
        const errorType = response.data as GetError;

        switch (errorType) {
          case GetError.NotFound:
            res.status(404).send("Rent not found");
            break;
          default:
            break;
        }
        return;
      } else {
        console.error("Unexpected error data type:", response.data);
        res.status(500).send("Internal Server Error"); // Or send a generic error response
      }
    }
    res.send(
      `Rent with id : ${(response.data as Rent).id} was deleted with success`
    );
  };
}

export const RentController = new rentController();
