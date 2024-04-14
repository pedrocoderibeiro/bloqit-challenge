import { Bloq } from "../../../entities";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { QueryParams } from "src/types/queryParams.type";

dotenv.config();

const getBloqs = async (params: QueryParams): Promise<Bloq[] | null> => {
  const filePath: string | undefined = process.env.FILE_BLOQ_PATH;
  if (!filePath) {
    throw new Error("File bloq path is not defined in the .env file");
  }
  const title = params["title"];
  const address = params["address"];
  try {
    // Read the file asynchronously using fs.promises.readFile
    const data = await fs.promises.readFile(filePath, "utf8");
    let bloqList: Bloq[] = JSON.parse(data);
    if (title !== undefined || address !== undefined) {
      bloqList = bloqList.filter(
        (bloq) =>
          (bloq.title.toLowerCase().includes(title?.toLowerCase()) &&
            bloq.address.toLowerCase().includes(address?.toLowerCase())) ||
          bloq.title.toLowerCase().includes(title?.toLowerCase()) ||
          bloq.address.toLowerCase().includes(address?.toLowerCase())
      );
    }

    return bloqList ?? [];
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getBloqs };
