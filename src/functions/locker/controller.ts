import { Request, Response } from "express";
import getLocker from "./get/getLocker";
import { LockerQueryParams } from "@schemas/index";
import { getLockers } from "./get/getLockers";
import postLocker from "./post/postLocker";
import putLocker from "./put/putLocker";
import deleteLocker from "./delete/deleteLocker";
import { GetError, DeleteLockerError, PutLockerError } from "@enums/error";
import { Locker } from "@entities/index";

class lockerController {
  getLocker = async (req: Request, res: Response) => {
    const id = req.params.id;

    const response = await getLocker(id);

    if (!response.success) {
      if (
        typeof response.data === "string" &&
        Object.values(GetError).includes(response.data as GetError)
      ) {
        const errorType = response.data as GetError;

        switch (errorType) {
          case GetError.NotFound:
            res.status(404).send("Locker not found");
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
  getLockers = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as LockerQueryParams;

    const response = await getLockers(queryParams);
    res.send(response.data);
  };
  createLocker = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await postLocker(body);
    res.send(response.data);
  };
  updateLocker = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const response = await putLocker(id, body);

    if (!response.success) {
      if (
        typeof response.data === "string" &&
        Object.values(PutLockerError).includes(response.data as PutLockerError)
      ) {
        const errorType = response.data as PutLockerError;

        switch (errorType) {
          case PutLockerError.LockerNotFound:
            res.status(404).send("Locker not found");
            break;
          case PutLockerError.BloqNotFound:
            res
              .status(409)
              .send("You need to unassociate rents from this locker");
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
    res.send(response);
  };
  deleteLocker = async (req: Request, res: Response) => {
    const id = req.params.id;
    const response = await deleteLocker(id);

    if (!response.success) {
      if (
        typeof response.data === "string" &&
        Object.values(DeleteLockerError).includes(
          response.data as DeleteLockerError
        )
      ) {
        const errorType = response.data as DeleteLockerError;

        switch (errorType) {
          case DeleteLockerError.NotFound:
            res.status(404).send("Locker not found");
            break;
          case DeleteLockerError.Conflict:
            res
              .status(409)
              .send("You need to unassociate rents from this locker");
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
      `Locker with id : ${
        (response.data as Locker).id
      } was deleted with success`
    );
  };
}
export const LockerController = new lockerController();
