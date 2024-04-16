import { LockerStatus } from "@enums/enum";
import { getLockers } from "src/functions/locker/get/getLockers";
import { getLocker } from "src/functions/locker/get/getLocker";
jest.mock("src/functions/locker/get/getLocker", () => ({
  getLocker: jest.fn(),
}));
jest.mock("src/functions/locker/get/getLockers", () => ({
  getLockers: jest.fn(),
}));

describe("Locker endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET LOCKER - Success return locker", async () => {
    const mockData = [
      {
        id: "7e412391f-b8e8-4d231b-a98d-cfe242323b1",
        bloqId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
        status: LockerStatus.CLOSED,
        isOccupied: false,
      },
    ];
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

  it("POST Locker - Success created locker", async () => {});
});
