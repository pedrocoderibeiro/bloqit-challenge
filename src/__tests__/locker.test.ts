import { LockerStatus } from "@enums/enum";
import { getLockers } from "src/functions/locker/get/getLockers";
import { getLocker } from "src/functions/locker/get/getLocker";
import { postLocker } from "src/functions/locker/post/postLocker";
import { putLocker } from "src/functions/locker/put/putLocker";

jest.mock("src/functions/locker/get/getLocker", () => ({
  getLocker: jest.fn(),
}));
jest.mock("src/functions/locker/get/getLockers", () => ({
  getLockers: jest.fn(),
}));
jest.mock("src/functions/locker/post/postLocker", () => ({
  postLocker: jest.fn(),
}));
jest.mock("src/functions/locker/put/putLocker", () => ({
  putLocker: jest.fn(),
}));

describe("Locker endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET LOCKER - Success return locker", async () => {
    const mockData = {
      id: "7e412391f-b8e8-4d231b-a98d-cfe242323b1",
      bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: LockerStatus.CLOSED,
      isOccupied: false,
    };
    (getLocker as jest.Mock).mockReturnValue(mockData);

    const result = await getLocker("7e412391f-b8e8-4d231b-a98d-cfe242323b1");

    expect(result).toBe(mockData);
  });

  it("GET LOCKER - Not found", async () => {
    const nonExistentLockerId = "non-existent-locker-id";
    (getLocker as jest.Mock).mockReturnValue("Locker not found");

    const result = await getLocker(nonExistentLockerId);

    expect(getLocker).toHaveBeenCalledWith(nonExistentLockerId);
    expect(result).toEqual("Locker not found");
  });

  it("GET LOCKER - Success return locker list", async () => {
    const mockLockers = [
      {
        id: "locker-id-1",
        bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
        status: LockerStatus.OPEN,
        isOccupied: false,
      },
      {
        id: "locker-id-2",
        bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
        status: LockerStatus.CLOSED,
        isOccupied: true,
      },
    ];

    (getLockers as jest.Mock).mockImplementation((params) => {
      return Promise.resolve(mockLockers);
    });

    const result = await getLockers({});

    expect(getLockers).toHaveBeenCalledWith({});

    expect(result).toEqual(mockLockers);
  });

  it("GET LOCKER - Success return filtered locker list by isOccupied and status", async () => {
    const mockLockers = [
      {
        id: "locker-id-1",
        bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
        status: LockerStatus.OPEN,
        isOccupied: false,
      },
      {
        id: "locker-id-2",
        bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
        status: LockerStatus.CLOSED,
        isOccupied: true,
      },
    ];

    (getLockers as jest.Mock).mockImplementation((params) => {
      const filteredLockers = mockLockers.filter((locker) => {
        if (params.status && locker.status !== params.status) {
          return false;
        }
        if (
          params.isOccupied !== undefined &&
          locker.isOccupied !== params.isOccupied
        ) {
          return false;
        }
        return true;
      });
      return Promise.resolve(filteredLockers);
    });

    const params = {
      status: LockerStatus.OPEN,
      isOccupied: false,
    };

    const result = await getLockers(params);
    expect(getLockers).toHaveBeenCalledWith(params);

    expect(result).toEqual([
      {
        id: "locker-id-1",
        bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
        status: LockerStatus.OPEN,
        isOccupied: false,
      },
    ]);
  });

  it("POST Locker - Success created locker", async () => {
    const newLockerData = {
      bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: LockerStatus.OPEN,
      isOccupied: false,
    };

    const expectedNewLocker = {
      id: "new-locker-id",
      bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: LockerStatus.OPEN,
      isOccupied: false,
    };

    (postLocker as jest.Mock).mockResolvedValue(expectedNewLocker);
    const result = await postLocker(newLockerData);
    expect(postLocker).toHaveBeenCalledWith(newLockerData);
    expect(result).toEqual(expectedNewLocker);
  });

  it("POST Locker - Bad request", async () => {
    const newLockerData = {
      bloqId: "not-uiid",
      status: "not a status" as LockerStatus,
      isOccupied: false,
    };
    const expectedError = {
      errors: [
        {
          message: "Invalid uuid",
          path: ["bloqId"],
        },
        {
          message:
            "Invalid enum value. Expected 'OPEN' | 'CLOSED', received 'not-status'",
          path: ["status"],
        },
      ],
    };

    (postLocker as jest.Mock).mockRejectedValue(expectedError);
    try {
      await postLocker(newLockerData);
    } catch (error) {
      expect(postLocker).toHaveBeenCalledWith(newLockerData);
      expect(error).toEqual(expectedError);
    }
  });

  it("PUT Locker - Success update locker", async () => {
    const id = "eaf2b12a-7f02-4f23-b282-1f0ad5c7e2c9";

    const updatedLockerData = {
      id,
      bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: LockerStatus.CLOSED,
      isOccupied: true,
    };
    (putLocker as jest.Mock).mockResolvedValue(updatedLockerData);

    const result = await putLocker(id, updatedLockerData);
    expect(putLocker).toHaveBeenCalledWith(id, updatedLockerData);
    expect(result).toEqual(updatedLockerData);
  });

  it("PUT Locker - Bad request", async () => {
    const id = "eaf2b12a-7f02-4f23-b282-1f0ad5c7e2c9";
    const malformedLockerData = {
      id,
      bloqId: "7e4f1",
      status: LockerStatus.CLOSED,
      isOccupied: true,
    };

    const expectedError = {
      errors: [
        {
          message: "Invalid uuid",
          path: ["bloqId"],
        },
      ],
    };

    (putLocker as jest.Mock).mockRejectedValue(expectedError);

    try {
      await putLocker(id, malformedLockerData);
    } catch (error) {
      expect(putLocker).toHaveBeenCalledWith(id, malformedLockerData);
      expect(error).toBe(expectedError);
    }
  });

  it("PUT Locker - Not found", async () => {
    const id = "2191e1b5-99c7-45df-8302-998be11";
    const updatedLockerData = {
      id,
      bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: LockerStatus.CLOSED,
      isOccupied: true,
    };

    (putLocker as jest.Mock).mockRejectedValue("Locker not found");
    try {
      await putLocker(id, updatedLockerData);
    } catch (error) {
      expect(putLocker).toHaveBeenCalledWith(id, updatedLockerData);

      expect(error).toBe("Locker not found");
    }
  });
});
