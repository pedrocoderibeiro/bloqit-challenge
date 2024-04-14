import { Rent } from "@entities/rent.model";
import { RentQueryParams } from "src/schemas/getSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();

const getRents = async (query: RentQueryParams): Promise<Rent[]> => {
  const filePath: string | undefined = process.env.FILE_RENT_PATH;
  if (!filePath) {
    throw new Error("File rent path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
  } catch (err) {
    throw new Error(`Error reading file : ${err}`);
  }
  return [];
};

export { getRents };
export default getRents;
