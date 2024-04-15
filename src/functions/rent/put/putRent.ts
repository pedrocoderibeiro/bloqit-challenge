import { Rent } from "@entities/rent.model";
import { PutRentRequest } from "src/schemas/putSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";
dotenv.config();

const putRent = async (
  id: string,
  body: PutRentRequest
): Promise<ApiResponse<Rent>> => {
  const filePath: string | undefined = process.env.FILE_RENT_PATH;
  if (!filePath) {
    throw new Error("File rent path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const rentList: Rent[] = JSON.parse(data);

    const rentIndex = rentList.findIndex((rent) => rent.id === id);

    if (rentIndex === -1) {
      return null; // controller will return 404
    }
    const updatedRent = { ...rentList[rentIndex], ...body }; // Merge updates
    rentList[rentIndex] = updatedRent;

    await fs.promises.writeFile(
      filePath,
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
