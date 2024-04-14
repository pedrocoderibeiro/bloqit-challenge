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
        console.log("bati aqui1");
        return (
          locker.bloqId === bloqId &&
          locker.status === status &&
          transformOccupied === locker.isOccupied
        );
      });
      return lockerList;
    }

    if (
      bloqId !== undefined &&
      transformOccupied === undefined &&
      status !== undefined
    ) {
      console.log("bati aqui2");
      lockerList = lockerList.filter((locker) => {
        return locker.bloqId === bloqId && locker.status === status;
      });
      return lockerList;
    }

    if (
      bloqId === undefined &&
      transformOccupied !== undefined &&
      status !== undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        console.log(
          locker.isOccupied === transformOccupied && locker.status === status,
          locker.status,
          status as LockerStatus
        );
        return (
          locker.isOccupied === transformOccupied && locker.status === status
        );
      });
      return lockerList;
    }

    if (
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
    }

    if (
      bloqId == undefined &&
      transformOccupied === undefined &&
      status !== undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        return locker.status === status;
      });
      return lockerList;
    }

    if (
      bloqId == undefined &&
      transformOccupied !== undefined &&
      status === undefined
    ) {
      lockerList = lockerList.filter((locker) => {
        return locker.isOccupied === transformOccupied;
      });
      return lockerList;
    }

    return lockerList ?? [];
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getLockers };
