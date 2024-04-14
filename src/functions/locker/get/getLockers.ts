import { LockerStatus } from "@enums/enum";
import { Locker } from "../../../entities";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { LockerQueryParams } from "src/schemas/getLockerSchema";

dotenv.config();

const getLockers = async (
  params: LockerQueryParams
): Promise<Locker[] | null> => {
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

    if (
      bloqId !== undefined &&
      transformOccupied !== undefined &&
      status !== undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        return (
          locker.bloqId === bloqId &&
          locker.status === status &&
          transformOccupied === locker.isOccupied
        );
      });
      return lockerList;
    } else if (
      bloqId !== undefined &&
      transformOccupied === undefined &&
      status !== undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        return locker.bloqId === bloqId && locker.status === status;
      });
      return lockerList;
    } else if (
      bloqId === undefined &&
      transformOccupied !== undefined &&
      status !== undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        return (
          locker.isOccupied === transformOccupied && locker.status === status
        );
      });
      return lockerList;
    } else if (
      bloqId !== undefined &&
      transformOccupied !== undefined &&
      status === undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        return (
          locker.isOccupied === transformOccupied && locker.bloqId === bloqId
        );
      });
      return lockerList;
    } else if (
      bloqId == undefined &&
      transformOccupied === undefined &&
      status !== undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        return locker.status === status;
      });
      return lockerList;
    } else if (
      bloqId == undefined &&
      transformOccupied !== undefined &&
      status === undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        return locker.isOccupied === transformOccupied;
      });
      return lockerList;
    } else {
      return lockerList ?? [];
    }
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

function filterLockers(
  lockerList: Locker[],
  bloqId: string,
  status: LockerStatus,
  transformOccupied: boolean
) {
  return lockerList.filter((locker) => {
    // Define initial condition to always return true
    let condition = true;

    // Add conditions based on provided parameters
    if (bloqId !== undefined) {
      condition = condition && locker.bloqId === bloqId;
    }
    if (status !== undefined) {
      condition = condition && locker.status === status;
    }
    if (transformOccupied !== undefined) {
      condition = condition && locker.isOccupied === transformOccupied;
    }

    // Return true only if all conditions are met
    return condition;
  });
}

export { getLockers };
