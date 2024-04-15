import { Locker, Rent } from "@entities/index";
import { DeleteLockerError } from "@enums/error";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";
dotenv.config();

const deleteLocker = async (
  id: string
): Promise<ApiResponse<Locker | DeleteLockerError>> => {
  const filePath: string | undefined = process.env.FILE_LOCKER_PATH;
  const fileRentPath: string | undefined = process.env.FILE_RENT_PATH;
  if (!filePath) {
    throw new Error("File locker path is not defined in the .env file");
  }
  if (!fileRentPath) {
    throw new Error("File locker path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const lockerList: Locker[] = JSON.parse(data);

    const lockerIndex = lockerList.findIndex((locker) => locker.id === id);

    if (lockerIndex === -1) {
      return { success: false, data: DeleteLockerError.NotFound }; // Return null for Express to handle 404
    }

    const locker = lockerList[lockerIndex]!;

    const rentData = await fs.promises.readFile(fileRentPath, "utf8");
    const rentList: Rent[] = JSON.parse(rentData);

    const associatedRents = rentList.filter(
      (rent) => rent.lockerId === locker.id
    );

    if (associatedRents.length > 0) {
      return { success: false, data: DeleteLockerError.Conflict };
    }
    const deletedLocker = lockerList.splice(lockerIndex, 1)[0]; // Remove bloq and return it

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(lockerList, null, 2),
      "utf8"
    );

    return { success: true, data: deletedLocker }; // Return the deleted locker object (optional)
  } catch (err) {
    throw new Error(`Error deleting locker : ${err}`);
  }
};

export { deleteLocker };
export default deleteLocker;
