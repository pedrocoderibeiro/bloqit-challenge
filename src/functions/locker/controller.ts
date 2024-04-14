import { Request, Response } from "express";

import getLocker from "./get/getLocker";
import { LockerQueryParams } from "src/schemas/getLockerSchema";
import { getLockers } from "./get/getLockers";

import postLocker from "./post/postLocker";

class lockerController {
  getLocker = async (req: Request, res: Response) => {
    const id = req.params.id;

    const locker = await getLocker(id);
    if (locker) res.send(locker);
    else res.status(404).json({ error: "Locker not found" });
  };
  getLockers = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as LockerQueryParams;
    console.log(req.query);
    const lockers = await getLockers(queryParams);
    res.send(lockers);
  };
  createLocker = async (req: Request, res: Response) => {
    const { body } = req;
    const locker = await postLocker(body);
    res.send(locker);
  };
}
export const LockerController = new lockerController();
