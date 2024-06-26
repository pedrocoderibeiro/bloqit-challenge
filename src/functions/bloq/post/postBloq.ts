import { Bloq } from "@entities/bloq.model";
import { BloqRequest } from "@schemas/index";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { ApiResponse } from "src/types/response.type";

dotenv.config();

const postBloq = async (body: BloqRequest): Promise<ApiResponse<Bloq>> => {
  const filePath: string | undefined = process.env.FILE_BLOQ_PATH;
  if (!filePath) {
    throw new Error("File bloq path is not defined in the .env file");
  }
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const bloqList: Bloq[] = JSON.parse(data);

    const uuid = uuidv4();
    const { address, title } = body;
    const newBloq = { id: uuid, address, title };
    bloqList.push(newBloq);
    fs.writeFile(
      filePath,
      JSON.stringify(bloqList, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return;
        }
        console.info("Data added successfully!");
      }
    );
    return { success: true, data: newBloq };
  } catch (err) {
    throw new Error(`Error reading file : ${err}`);
  }
};

export { postBloq };
export default postBloq;
