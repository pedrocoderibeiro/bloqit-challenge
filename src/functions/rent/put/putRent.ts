import { Rent, Locker } from "@entities/index";
import { PutRentRequest } from "src/schemas/putSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";
import { GetError, PutRentError } from "@enums/error";
import { RentStatus } from "@enums/enum";

dotenv.config();

const putRent = async (
  id: string,
  body: PutRentRequest
): Promise<ApiResponse<Rent | PutRentError>> => {
  const fileRentData: string | undefined = process.env.FILE_RENT_PATH;
  const fileLockerPath: string | undefined = process.env.FILE_LOCKER_PATH;
  if (!fileRentData) {
    throw new Error("File rent path is not defined in the .env file");
  }

  if (!fileLockerPath) {
    throw new Error("File locker path is not defined in the .env file");
  }

  try {
    const rentData = await fs.promises.readFile(fileRentData, "utf8");
    const rentList: Rent[] = JSON.parse(rentData);

    const rentIndex = rentList.findIndex((rent) => rent.id === id);

    if (rentIndex === -1) {
      return { success: false, data: PutRentError.RentNotFound };
    }

    const lockerData = await fs.promises.readFile(fileLockerPath, "utf8");
    const lockerList: Locker[] = JSON.parse(lockerData);

    const locker = lockerList.find((locker) => locker.id === body.lockerId);

    if (!locker && body.status !== RentStatus.CREATED) {
      return { success: false, data: PutRentError.LockerNotFound };
    }

    let updateRent: Rent = {
      id,
      lockerId: body.lockerId,
      size: body.size,
      status: body.status,
      weight: body.weight,
      ...(body.status === RentStatus.WAITING_PICKUP
        ? { droppedOffAt: new Date() }
        : {}),
      ...(body.status === RentStatus.DELIVERED
        ? { pickedUpAt: new Date() }
        : {}),
    };

    if (
      updateRent.droppedOffAt &&
      updateRent.pickedUpAt &&
      updateRent.droppedOffAt > updateRent.pickedUpAt
    ) {
      return { success: false, data: PutRentError.Conflict };
    }

    const updatedRent = { ...rentList[rentIndex], ...updateRent };
    rentList[rentIndex] = updatedRent;

    await fs.promises.writeFile(
      fileRentData,
      JSON.stringify(rentList, null, 2),
      "utf8"
    );

    return { success: true, data: updatedRent };
  } catch (err) {
    throw new Error(`Error updating bloq : ${err}`);
  }
};

export { putRent };
export default putRent;
