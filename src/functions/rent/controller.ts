import { Request, Response } from "express";
import getRent from "./get/getRent";

class rentController {
  getRent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const rent = await getRent(id);
    if (rent) res.send(rent);
    else res.status(404).json({ error: "Locker not found" });
  };
}
export const RentController = new rentController();
