import { Bloq } from "@entities/bloq.model";
import { GetError } from "@enums/error";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";

dotenv.config();

const getBloq = async (id: string): Promise<ApiResponse<Bloq | GetError>> => {
  const filePath: string | undefined = process.env.FILE_BLOQ_PATH;
  if (!filePath) {
    throw new Error("File bloq path is not defined in the .env file");
  }

  try {
    // Read the file asynchronously using fs.promises.readFile
    const data = await fs.promises.readFile(filePath, "utf8");
    const bloqList: Bloq[] = JSON.parse(data);
    const bloq = bloqList.find((bloq) => bloq.id === id);
    if (!bloq) return { success: false, data: GetError.NotFound };
    return { success: true, data: bloq };
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getBloq };
