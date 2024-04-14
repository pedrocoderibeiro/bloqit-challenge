import { Bloq } from "@entities/bloq.model";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const getBloq = async (id: string): Promise<Bloq | null> => {
  const filePath: string | undefined = process.env.FILE_BLOQ_PATH;
  if (!filePath) {
    throw new Error("File bloq path is not defined in the .env file");
  }

  try {
    // Read the file asynchronously using fs.promises.readFile
    const data = await fs.promises.readFile(filePath, "utf8");
    const bloqList: Bloq[] = JSON.parse(data);
    const bloq = bloqList.find((bloq) => bloq.id === id) ?? null;
    return bloq;
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getBloq };
