import { NextFunction, Request, Response } from "express";
import { RefinementCtx, ZodError, ZodSchema, z } from "zod";
import { ParsedQs } from "qs";
import { LockerRequest } from "src/schemas/postSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { Bloq } from "@entities/bloq.model";
import { RentStatus } from "@enums/enum";

dotenv.config();

const validateSchema = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          message: err.message,
          path: err.path,
        }));
        return res.status(400).json({ errors: formattedErrors });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
const validateQueryParams = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams: ParsedQs = req.query;

      schema.parse(queryParams);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ error: "Validation error", details: error.errors });
      } else {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
};

const validateBloq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bloqId } = req.body as LockerRequest;
    const filePath: string | undefined = process.env.FILE_BLOQ_PATH;

    if (!filePath) {
      return res
        .status(500)
        .send({ error: "File bloq path is not defined in the .env file" });
    }

    const data = await fs.promises.readFile(filePath, "utf8");
    const bloqList: Bloq[] = JSON.parse(data);
    const bloq = bloqList.find((bloq) => bloq.id === bloqId) ?? null;

    if (!bloq) {
      return res.status(404).send({ error: "Bloq not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export { validateSchema, validateQueryParams, validateBloq };
