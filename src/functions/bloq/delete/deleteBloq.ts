import { Bloq } from "@entities/bloq.model";
import { GetError } from "@enums/error";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";
dotenv.config();

const deleteBloq = async (
  id: string
): Promise<ApiResponse<Bloq | GetError>> => {
  const filePath: string | undefined = process.env.FILE_BLOQ_PATH;
  if (!filePath) {
    throw new Error("File bloq path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const bloqList: Bloq[] = JSON.parse(data);

    const bloqIndex = bloqList.findIndex((bloq) => bloq.id === id);

    if (bloqIndex === -1) {
      return { success: false, data: GetError.NotFound }; // Return null for Express to handle 404
    }

    const deletedBloq = bloqList.splice(bloqIndex, 1)[0]; // Remove bloq

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(bloqList, null, 2),
      "utf8"
    );

    return { success: true, data: deletedBloq };
  } catch (err) {
    throw new Error(`Error deleting bloq : ${err}`);
  }
};

export { deleteBloq };
export default deleteBloq;
