import { Locker } from "@entities/locker.model";
import { GetError } from "@enums/error";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";

dotenv.config();

const getLocker = async (
  id: string
): Promise<ApiResponse<Locker | GetError>> => {
  const filePath: string | undefined = process.env.FILE_LOCKER_PATH;
  if (!filePath) {
    throw new Error("File lockers path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const lockerList: Locker[] = JSON.parse(data);

    const locker = lockerList.find((locker) => locker.id === id);
    if (!locker) return { success: false, data: GetError.NotFound };
    return { success: true, data: locker };
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getLocker };
export default getLocker;
