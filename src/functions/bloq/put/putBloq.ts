import { Bloq } from "@entities/index";
import { PutBloqRequest } from "@schemas/putSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";
import { GetError } from "@enums/index";
dotenv.config();

const putBloq = async (
  id: string,
  body: PutBloqRequest
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
      return { success: false, data: GetError.NotFound };
    }
    const updatedBloq = { ...bloqList[bloqIndex], ...body }; // Merge updates
    bloqList[bloqIndex] = updatedBloq;

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(bloqList, null, 2),
      "utf8"
    );

    return { success: false, data: updatedBloq };
  } catch (err) {
    throw new Error(`Error updating bloq : ${err}`);
  }
};

export { putBloq };
export default putBloq;
