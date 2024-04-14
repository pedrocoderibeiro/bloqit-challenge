import { LockerRequest } from "src/schemas/postSchema";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { Locker } from "@entities/locker.model";

dotenv.config();
const postLocker = async (body: LockerRequest) => {
  const filePath: string | undefined = process.env.FILE_LOCKER_PATH;
  if (!filePath) {
    throw new Error("File locker path is not defined in the .env file");
  }

  try {
    let lockerList: Locker[] = [];

    try {
      const data = await fs.promises.readFile(filePath, "utf8");
      lockerList = JSON.parse(data);
    } catch (readErr) {
      console.error("Error reading or parsing file:", readErr);
    }

    const uuid = uuidv4();
    const { bloqId, isOccupied, status } = body;
    const newLocker = { id: uuid, bloqId, status, isOccupied };
    lockerList.push(newLocker);

    fs.writeFile(
      filePath,
      JSON.stringify(lockerList, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return;
        }
        console.log("Data added successfully!");
      }
    );

    return newLocker;
  } catch (err) {
    throw new Error(`Error processing request: ${err}`);
  }
};

export { postLocker };
export default postLocker;
