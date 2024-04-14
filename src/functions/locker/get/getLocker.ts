import { Locker } from "@entities/locker.model";
import * as dotenv from "dotenv";
import * as fs from "fs";

const getLocker = async (id: string) => {
  const filePath: string | undefined = process.env.FILE_LOCKER_PATH;
  if (!filePath) {
    throw new Error("File lockers path is not defined in the .env file");
  }

  try {
    // Read the file asynchronously using fs.promises.readFile
    const data = await fs.promises.readFile(filePath, "utf8");
    const lockerList: Locker[] = JSON.parse(data);

    const locker = lockerList.find((locker) => locker.id === id) ?? null;
    return locker;
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getLocker };
export default getLocker;
