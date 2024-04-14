import { Request, Response } from "express";
import getRent from "./get/getRent";
import { RentQueryParams } from "src/schemas/getSchema";
import getRents from "./get/getRents";

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
}
export const RentController = new rentController();
