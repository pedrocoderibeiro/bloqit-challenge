import express from "express";
import { BloqController } from "./controller";
import { validateSchema } from "../../validators/validator";
import { postBloqRequest } from "../../schemas/postBloqRequestSchema";

const bloqRouter = express.Router();

bloqRouter.get("/:id", BloqController.getBloq);
bloqRouter.get("/", BloqController.getBloqs);
bloqRouter.post(
  "/",
  validateSchema(postBloqRequest),
  BloqController.createBloq
);

export { bloqRouter };
