import { Rent } from "@entities/rent.model";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";
dotenv.config();

const deleteRent = async (id: string): Promise<ApiResponse<Rent>> => {
  const filePath: string | undefined = process.env.FILE_RENT_PATH;
  if (!filePath) {
    throw new Error("File rent path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const rentlist: Rent[] = JSON.parse(data);

    const rentIndex = rentlist.findIndex((rent) => rent.id === id);

    if (rentIndex === -1) {
      return null; // Return null for Express to handle 404
    }

    const deletedRent = rentlist.splice(rentIndex, 1)[0]; // Remove bloq and return it

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(rentlist, null, 2),
      "utf8"
    );

    return { success: true, data: deletedRent };
  } catch (err) {
    throw new Error(`Error deleting rent : ${err}`);
  }
};

export { deleteRent };
export default deleteRent;
