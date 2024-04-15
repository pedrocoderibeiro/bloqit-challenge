import { Request, Response } from "express";
import { getBloq } from "./get/getBloq";
import { getBloqs } from "./get/getBloqs";
import { QueryParams } from "src/types/queryParams.type";
import postBloq from "./post/postBloq";
import putBloq from "./put/putBloq";
import deleteBloq from "./delete/deleteBloq";
import { Bloq } from "@entities/bloq.model";

class bloqController {
  getBloq = async (req: Request, res: Response) => {
    const id = req.params.id;
    const bloq = await getBloq(id);
    if (bloq) res.send(bloq);
    else res.status(404).json({ error: "Bloq not found" });
  };
  getBloqs = async (req: Request, res: Response) => {
    const queryParams: QueryParams = req.query as QueryParams;
    const bloqs = await getBloqs(queryParams);
    res.send(bloqs);
  };
  createBloq = async (req: Request, res: Response) => {
    const { body } = req;
    const bloq = await postBloq(body);
    res.send(bloq);
  };
  updateBloq = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const bloq = await putBloq(id, body);
    res.send(bloq);
  };
  deleteBloq = async (req: Request, res: Response) => {
    const id = req.params.id;
    const response = await deleteBloq(id);
    if (response.success)
      res.send(
        `Bloq with id : ${(response.data as Bloq).id} was deleted with success`
      );
    else res.status(404).json({ error: "Bloq not found" });
  };
}
export const BloqController = new bloqController();
