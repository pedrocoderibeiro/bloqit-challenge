import { applyFilters } from "@validators/filter";
import { Bloq } from "../../../entities";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { QueryParams } from "src/types/queryParams.type";
import { ApiResponse } from "src/types/response.type";

dotenv.config();

const getBloqs = async (
  params: QueryParams
): Promise<ApiResponse<Bloq[] | null>> => {
  const filePath: string | undefined = process.env.FILE_BLOQ_PATH;
  if (!filePath) {
    throw new Error("File bloq path is not defined in the .env file");
  }
  const title = params["title"];
  const address = params["address"];
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    let bloqList: Bloq[] = JSON.parse(data);

    bloqList =
      applyFilters(bloqList, [
        (bloq) =>
          title === void 0 ||
          bloq.title.toLowerCase().includes(title?.toLocaleLowerCase()),
        (bloq) =>
          address === void 0 ||
          bloq.address.toLowerCase().includes(address?.toLocaleLowerCase()),
      ]) ?? [];

    return { success: true, data: bloqList };
  } catch (error) {
    throw new Error(`Error reading file : ${error}`);
  }
};

export { getBloqs };
