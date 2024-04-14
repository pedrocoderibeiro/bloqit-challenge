import { Rent } from "@entities/rent.model";
import * as dotenv from "dotenv";
import * as fs from "fs";

const getRent = async (id: string): Promise<Rent | null> => {
  const filePath: string | undefined = process.env.FILE_RENT_PATH;
  if (!filePath) {
    throw new Error("File rent path is not defined in the .env file");
  }

  try {
    // Read the file asynchronously using fs.promises.readFile
    const data = await fs.promises.readFile(filePath, "utf8");
    const rentList: Rent[] = JSON.parse(data);
    const rent = rentList.find((rent) => rent.id === id) ?? null;
    return rent;
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getRent };
export default getRent;
