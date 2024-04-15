import { Bloq } from "../../../entities";
import { PutBloqRequest } from "src/schemas/putSchema";
import * as dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();

const putBloq = async (id: string, body: PutBloqRequest) => {
  const filePath: string | undefined = process.env.FILE_BLOQ_PATH;
  if (!filePath) {
    throw new Error("File bloq path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const bloqList: Bloq[] = JSON.parse(data);

    const bloqIndex = bloqList.findIndex((bloq) => bloq.id === id);

    if (bloqIndex === -1) {
      return null; // controller will return 404
    }
    const updatedBloq = { ...bloqList[bloqIndex], ...body }; // Merge updates
    bloqList[bloqIndex] = updatedBloq;

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(bloqList, null, 2),
      "utf8"
    );

    return updatedBloq;
  } catch (err) {
    throw new Error(`Error updating bloq : ${err}`);
  }
};

export { putBloq };
export default putBloq;
