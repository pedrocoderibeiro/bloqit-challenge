import { Rent } from "@entities/rent.model";
import { RentRequest } from "@schemas/postSchema";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { RentSize, RentStatus } from "@enums/enum";
import { ApiResponse } from "src/types/response.type";

dotenv.config();

const postRent = async (body: RentRequest): Promise<ApiResponse<Rent>> => {
  const filePath: string | undefined = process.env.FILE_RENT_PATH;
  if (!filePath) {
    throw new Error("File bloq path is not defined in the .env file");
  }

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const rentList: Rent[] = JSON.parse(data);

    const uuid = uuidv4();
    const { lockerId, size, weight } = body;
    const newRent: Rent = {
      id: uuid,
      lockerId,
      size: size as RentSize,
      weight,
      status: RentStatus.CREATED,
    };
    rentList.push(newRent);
    fs.writeFile(
      filePath,
      JSON.stringify(newRent, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return;
        }
        console.info("Data added successfully!");
      }
    );
    return { success: true, data: newRent };
  } catch (err) {
    throw new Error(`Error reading file : ${err}`);
  }
};

export { postRent };
export default postRent;
