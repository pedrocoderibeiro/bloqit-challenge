import { Request, Response } from "express";
import { getBloq } from "./get/getBloq";
import { getBloqs } from "./get/getBloqs";
import { QueryParams } from "src/types/queryParams.type";
import postBloq from "./post/postBloq";
import putBloq from "./put/putBloq";
import deleteBloq from "./delete/deleteBloq";
import { Bloq } from "@entities/bloq.model";
import { GetError } from "@enums/error";

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
    const response = await putBloq(id, body);

    if (!response.success) {
      if (
        typeof response.data === "string" &&
        Object.values(GetError).includes(response.data as GetError)
      ) {
        const errorType = response.data as GetError;

        switch (errorType) {
          case GetError.NotFound:
            res.status(404).send("Bloq not found");
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
  deleteBloq = async (req: Request, res: Response) => {
    const id = req.params.id;
    const response = await deleteBloq(id);

    if (!response.success) {
      if (
        typeof response.data === "string" &&
        Object.values(GetError).includes(response.data as GetError)
      ) {
        const errorType = response.data as GetError;

        switch (errorType) {
          case GetError.NotFound:
            res.status(404).send("Bloq not found");
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
      `Bloq with id : ${(response.data as Bloq).id} was deleted with success`
    );
  };
}
export const BloqController = new bloqController();
