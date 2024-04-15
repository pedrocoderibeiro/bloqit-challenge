import { Request, Response } from "express";
import getRent from "./get/getRent";
import { RentQueryParams } from "src/schemas/getSchema";
import getRents from "./get/getRents";
import postRent from "./post/postRent";
import putRent from "./put/putRent";
import deleteRent from "./delete/deleteRent";

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
    const rent = await postRent(body);
    res.send(rent);
  };
  updateRent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const rent = await putRent(id, body);
    res.send(rent);
  };
  deleteRent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const rent = await deleteRent(id);
    if (rent) res.send(`Rent with id : ${rent.id} was deleted with success`);
    else res.status(404).json({ error: "Rent not found" });
  };
}

export const RentController = new rentController();
