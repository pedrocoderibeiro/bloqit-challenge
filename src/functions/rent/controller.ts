import { Request, Response } from "express";
import getRent from "./get/getRent";
import { RentQueryParams } from "src/schemas/getSchema";
import getRents from "./get/getRents";
import postRent from "./post/postRent";

class rentController {
  getRent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const rent = await getRent(id);
    if (rent) res.send(rent);
    else res.status(404).json({ error: "Rent not found" });
  };
  getRents = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as RentQueryParams;
    const rents = await getRents(queryParams);
    res.send(rents);
  };
  createRent = async (req: Request, res: Response) => {
    const { body } = req;
    const rent = await postRent(body);
    res.send(rent);
  };
}
export const RentController = new rentController();
