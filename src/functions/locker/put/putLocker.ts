import { Locker, Bloq } from "@entities/index";
import { PutLockerRequest } from "src/schemas/putSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";
import { GetError, PutLockerError } from "@enums/error";

dotenv.config();

const putLocker = async (
  id: string,
  body: PutLockerRequest
): Promise<ApiResponse<Locker | PutLockerError>> => {
  const fileLockerPath: string | undefined = process.env.FILE_LOCKER_PATH;
  const fileBloqPath: string | undefined = process.env.FILE_LOCKER_PATH;
  if (!fileLockerPath) {
    throw new Error("File locker path is not defined in the .env file");
  }
  if (!fileBloqPath) {
    throw new Error("File bloq path is not defined in the .env file");
  }

  try {
    const lockerData = await fs.promises.readFile(fileLockerPath, "utf8");
    const lockerList: Locker[] = JSON.parse(lockerData);

    const lockerIndex = lockerList.findIndex((bloq) => bloq.id === id);

    if (lockerIndex === -1) {
      return { success: false, data: PutLockerError.LockerNotFound };
    }

    const bloqData = await fs.promises.readFile(fileLockerPath, "utf8");
    const bloqList: Bloq[] = JSON.parse(bloqData);

    const bloq = bloqList.find((bloq) => bloq.id === body.bloqId);
    if (!bloq) {
      return { success: false, data: PutLockerError.BloqNotFound };
    }
    const updatedLocker = { ...lockerList[lockerIndex], ...body };
    lockerList[lockerIndex] = updatedLocker;

    await fs.promises.writeFile(
      fileLockerPath,
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
