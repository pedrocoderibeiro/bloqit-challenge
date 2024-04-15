import { Locker } from "@entities/locker.model";
import { PutLockerRequest } from "src/schemas/putSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";
dotenv.config();

const putLocker = async (
  id: string,
  body: PutLockerRequest
): Promise<ApiResponse<Locker>> => {
  const filePath: string | undefined = process.env.FILE_LOCKER_PATH;
  if (!filePath) {
    throw new Error("File locker path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const lockerList: Locker[] = JSON.parse(data);

    const lockerIndex = lockerList.findIndex((bloq) => bloq.id === id);

    if (lockerIndex === -1) {
      return null; // controller will return 404
    }
    const updatedLocker = { ...lockerList[lockerIndex], ...body }; // Merge updates
    lockerList[lockerIndex] = updatedLocker;

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(lockerList, null, 2),
      "utf8"
    );

    return { success: true, data: updatedLocker };
  } catch (err) {
    throw new Error(`Error updating bloq : ${err}`);
  }
};

export { putLocker };
export default putLocker;

//Add proper error handling to all put endpoints
