import { Rent } from "@entities/rent.model";
import { RentSize, RentStatus } from "@enums/enum";
import { getRent } from "src/functions/rent/get/getRent";
import { getRents } from "src/functions/rent/get/getRents";
import { postRent } from "src/functions/rent/post/postRent";
import { putRent } from "src/functions/rent/put/putRent";

jest.mock("src/functions/rent/get/getRent", () => ({
  getRent: jest.fn(),
}));
jest.mock("src/functions/rent/get/getRents", () => ({
  getRents: jest.fn(),
}));
jest.mock("src/functions/rent/post/postRent", () => ({
  postRent: jest.fn(),
}));
jest.mock("src/functions/rent/put/putRent", () => ({
  putRent: jest.fn(),
}));

describe("Rent endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET Rent - Success return rent", async () => {
    const mockRent: Rent = {
      id: "7e412391f-b8e8-4d231b-a98d-cfe242323b1",
      lockerId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: RentStatus.CREATED,
      size: RentSize.S,
      weight: 5,
    };

    (getRent as jest.Mock).mockReturnValue(mockRent);

    const result = await getRent("7e412391f-b8e8-4d231b-a98d-cfe242323b1");

    expect(result).toBe(mockRent);
  });

  it("GET Rent - Not found", async () => {
    const nonExistentRentId = "non-existent-locker-id";
    (getRent as jest.Mock).mockReturnValue("Rent not found");

    const result = await getRent(nonExistentRentId);

    expect(getRent).toHaveBeenCalledWith(nonExistentRentId);
    expect(result).toEqual("Rent not found");
  });

  it("GET Rent - Success return rent list", async () => {
    const mockRents: Rent[] = [
      {
        id: "8e412391f-b8e8-4d231b-a98d-cfe242323b1",
        lockerId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
        status: RentStatus.DELIVERED,
        size: RentSize.S,
        weight: 5,
      },
      {
        id: "9e412391f-b8e8-4d231b-a98d-cfe242323b1",
        lockerId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
        status: RentStatus.CREATED,
        size: RentSize.S,
        weight: 5,
      },
    ];

    (getRents as jest.Mock).mockImplementation((params) => {
      return Promise.resolve(mockRents);
    });

    const result = await getRents({});

    expect(getRents).toHaveBeenCalledWith({});

    expect(result).toEqual(mockRents);
  });

  it("POST Rent - Success created rent", async () => {
    const newLRentrData = {
      lockerId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: RentStatus.CREATED,
      size: RentSize.S,
      weight: 10,
    };

    const expectedNewRent = {
      id: "new-rent-id",
      lockerId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: RentStatus.CREATED,
      size: RentSize.S,
      weight: 10,
    };

    (postRent as jest.Mock).mockResolvedValue(expectedNewRent);
    const result = await postRent(newLRentrData);
    expect(postRent).toHaveBeenCalledWith(newLRentrData);
    expect(result).toEqual(expectedNewRent);
  });

  it("POST Rent - Bad request", async () => {
    const newLRentData = {
      lockerId: "not-uid",
      status: RentStatus.CREATED,
      size: RentSize.S,
      weight: 100,
    };
    const expectedError = {
      errors: [
        {
          message: "Invalid uuid",
          path: ["lockerId"],
        },
        {
          message: "Rent size 'S' weight must be between 5 and 10 grams",
          path: ["size", "weight"],
        },
      ],
    };

    (postRent as jest.Mock).mockRejectedValue(expectedError);
    try {
      await postRent(newLRentData);
    } catch (error) {
      expect(postRent).toHaveBeenCalledWith(newLRentData);
      expect(error).toEqual(expectedError);
    }
  });

  it("PUT Rent - Success update rent", async () => {
    const id = "eaf2b12a-7f02-4f23-b282-1f0ad5c7e2c9";

    const updatedRentData = {
      id,
      lockerId: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      status: RentStatus.CREATED,
      size: RentSize.XS,
      weight: 5,
    };
    (putRent as jest.Mock).mockResolvedValue(updatedRentData);

    const result = await putRent(id, updatedRentData);
    expect(putRent).toHaveBeenCalledWith(id, updatedRentData);
    expect(result).toEqual(updatedRentData);
  });

  it("PUT Rent - Bad request", async () => {
    const id = "eaf2b12a-7f02-4f23-b282-1f0ad5c7e2c9";
    const malformedRentData = {
      id,
      lockerId: "7e4f1-2309",
      status: RentStatus.WAITING_DROPOFF,
      size: RentSize.S,
      weight: 10,
    };

    const expectedError = {
      errors: [
        {
          message: "Invalid uuid",
          path: ["bloqId"],
        },
      ],
    };

    (putRent as jest.Mock).mockRejectedValue(expectedError);

    try {
      await putRent(id, malformedRentData);
    } catch (error) {
      expect(putRent).toHaveBeenCalledWith(id, malformedRentData);
      expect(error).toBe(expectedError);
    }
  });
});
