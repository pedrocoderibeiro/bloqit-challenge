import { Rent } from "@entities/rent.model";
import { RentQueryParams } from "src/schemas/getSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { applyFilters } from "@validators/filter";
import { ApiResponse } from "src/types/response.type";
dotenv.config();

const getRents = async (
  query: RentQueryParams
): Promise<ApiResponse<Rent[]>> => {
  const filePath: string | undefined = process.env.FILE_RENT_PATH;
  if (!filePath) {
    throw new Error("File rent path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    let rentList: Rent[] = JSON.parse(data);
    const { lockerId, size, status } = query;
    rentList =
      applyFilters(rentList, [
        (rent) => status === void 0 || rent.status === status,
        (rent) => lockerId === void 0 || rent.lockerId === lockerId,
        (rent) => size === void 0 || rent.size == size,
      ]) ?? [];
    return { success: true, data: rentList };
  } catch (err) {
    throw new Error(`Error reading file : ${err}`);
  }
};

export { getRents };
export default getRents;
