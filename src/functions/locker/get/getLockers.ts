import { LockerStatus } from "@enums/enum";
import { Locker } from "../../../entities";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { LockerQueryParams } from "src/schemas/getLockerSchema";
import { applyFilters } from "@validators/filter";
import { ApiResponse } from "src/types/response.type";

dotenv.config();

const getLockers = async (
  params: LockerQueryParams
): Promise<ApiResponse<Locker[]>> => {
  const filePath: string | undefined = process.env.FILE_LOCKER_PATH;
  if (!filePath) {
    throw new Error("File lockers path is not defined in the .env file");
  }
  const { status, bloqId, isOccupied } = params;

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    let lockerList: Locker[] = JSON.parse(data);

    const transformOccupied =
      (isOccupied as unknown as string) === "false" ? false : true;
    lockerList =
      applyFilters(lockerList, [
        (locker) => status === void 0 || locker.status === status,
        (locker) => bloqId === void 0 || locker.bloqId === bloqId,
        (locker) =>
          isOccupied === void 0 || locker.isOccupied == transformOccupied,
      ]) ?? [];

    return { success: false, data: lockerList };
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getLockers };
