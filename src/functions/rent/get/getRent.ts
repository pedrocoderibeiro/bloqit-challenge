import { Rent } from "@entities/rent.model";
import { GetError } from "@enums/error";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";

const getRent = async (id: string): Promise<ApiResponse<Rent | GetError>> => {
  const filePath: string | undefined = process.env.FILE_RENT_PATH;
  if (!filePath) {
    throw new Error("File rent path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const rentList: Rent[] = JSON.parse(data);
    const rent = rentList.find((rent) => rent.id === id);
    if (!rent) return { success: false, data: GetError.NotFound };
    return { success: true, data: rent };
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getRent };
export default getRent;
