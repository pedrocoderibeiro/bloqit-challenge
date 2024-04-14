import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema, z } from "zod";
import { ParsedQs } from "qs";

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

export { validateSchema, validateQueryParams };
