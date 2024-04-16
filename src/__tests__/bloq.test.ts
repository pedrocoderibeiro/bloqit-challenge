import { Bloq } from "@entities/bloq.model";
import { getBloq } from "src/functions/bloq/get/getBloq";
import { getBloqs } from "src/functions/bloq/get/getBloqs";
import { postBloq } from "src/functions/bloq/post/postBloq";
import { putBloq } from "src/functions/bloq/put/putBloq";
import { deleteBloq } from "src/functions/bloq/delete/deleteBloq";

jest.mock("src/functions/bloq/get/getBloq", () => ({
  getBloq: jest.fn(),
}));

jest.mock("src/functions/bloq/get/getBloqs", () => ({
  getBloqs: jest.fn(),
}));

jest.mock("src/functions/bloq/post/postBloq", () => ({
  postBloq: jest.fn(),
}));
jest.mock("src/functions/bloq/put/putBloq", () => ({
  putBloq: jest.fn(),
}));
jest.mock("src/functions/bloq/delete/deleteBloq", () => ({
  deleteBloq: jest.fn(),
}));

describe("Bloq endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("GET BLOQ - Success (mocked data)", async () => {
    const mockData = {
      id: "7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e",
      title: "Seixal",
      address: "rua",
    };
    (getBloq as jest.Mock).mockReturnValue(mockData);

    const result = await getBloq("7e4f191f-b8e8-4d1b-a98d-cfe24b1e4f2e");

    expect(result).toBe(mockData);
  });
  it("GET BLOQ - Not found", async () => {
    (getBloq as jest.Mock).mockReturnValue({});

    const result = await getBloq("7e4f191f-b8e8-4d1b-a98d");

    expect(result).toEqual({});
  });

  it("GET BLOQ - Success list of bloqs, no filtering", async () => {
    const mockData = [
      {
        id: "7e4f1191f-b8e8-4d1b-a98d-cfe242134f2e",
        title: "Seixal",
        address: "rua dos aliados",
      },
      {
        id: "7e4f19231f-b8e8-4d1b-123-cfe24b1e4f2e",
        title: "Setubal",
        address: "rua dos correios",
      },
      {
        id: "7e4f12191f-b8e8-4d1b-a98d-23123",
        title: "Lisboa",
        address: "rua dos mocks",
      },
    ];
    (getBloqs as jest.Mock).mockReturnValue(mockData);

    const result = await getBloqs({});

    expect(result).toBe(mockData);
  });

  it("Success list of bloqs, with title filter (Seixal)", async () => {
    const mockData = [
      {
        id: "7e4f1191f-b8e8-4d1b-a98d-cfe242134f2e",
        title: "Seixal",
        address: "rua dos aliados",
      },
      {
        id: "7e4f19231f-b8e8-4d1b-123-cfe24b1e4f2e",
        title: "Setubal",
        address: "rua dos correios",
      },
      {
        id: "7e4f12191f-b8e8-4d1b-a98d-23123",
        title: "Lisboa",
        address: "rua dos mocks",
      },
    ];

    (getBloqs as jest.Mock).mockImplementation((filters) => {
      return Promise.resolve(
        mockData.filter((bloq) => bloq.title === filters.title)
      );
    });

    const filters = { title: "Seixal" };
    const result = await getBloqs(filters);

    expect(getBloqs).toHaveBeenCalledWith(filters);
    expect(result).toEqual([mockData[0]]);
  });
  it("POST /bloq - Success (create bloq)", async () => {
    const mockData: Bloq = {
      id: "123e4f56-789a-0000-abcd-ef0123456789",
      title: "New Bloq",
      address: "Some address",
    };

    (postBloq as jest.Mock).mockResolvedValue(mockData);

    const newBloq = {
      title: "New Bloq",
      address: "Some address",
    };

    const result = await postBloq(newBloq);

    expect(postBloq).toHaveBeenCalledWith(newBloq);

    expect(result).toEqual(mockData);
  });

  it("POST /bloq - Bad request", async () => {
    const error = {
      errors: [
        {
          message: "String must contain at least 3 character(s)",
          path: ["title"],
        },
      ],
    };

    (postBloq as jest.Mock).mockRejectedValue(error);

    const invalidData = {
      title: "ti",
      address: "Some address",
    };

    try {
      await postBloq(invalidData);
    } catch (thrownError) {
      expect(postBloq).toHaveBeenCalledWith(invalidData);
      expect(thrownError).toEqual(error);
    }
  });

  it("PUT BLOQ - Success update bloq", async () => {
    const updatedBloqData = {
      id: "123e4f56-789a-0000-abcd-ef0123456789",
      title: "Updated Bloq",
      address: "Updated address",
    };

    (putBloq as jest.Mock).mockResolvedValue(updatedBloqData);

    const bloqId = "123e4f56-789a-0000-abcd-ef0123456789";

    const updatedData = {
      title: "Updated Bloq",
      address: "Updated address",
    };
    const result = await putBloq(bloqId, updatedData);

    expect(putBloq).toHaveBeenCalledWith(bloqId, updatedData);
    expect(result).toEqual(updatedBloqData);
  });

  it("PUT BLOQ - Bad request", async () => {
    const error = {
      errors: [
        {
          message: "String must contain at least 3 character(s)",
          path: ["title"],
        },
        {
          message: "String must contain at least 3 character(s)",
          path: ["address"],
        },
      ],
    };
    (putBloq as jest.Mock).mockRejectedValue(error);

    const bloqId = "123e4f56-789a-0000-abcd-ef0123456789";

    const invalidData = {
      title: "",
      address: "",
    };

    try {
      await putBloq(bloqId, invalidData);
    } catch (thrownError) {
      expect(putBloq).toHaveBeenCalledWith(bloqId, invalidData);
      expect(thrownError).toEqual(error);
    }
  });
  it("DELETE BLOQ - Success deleting bloq", async () => {
    const bloqId = "123e4f56-789a-0000-abcd-ef0123456789";

    (deleteBloq as jest.Mock).mockResolvedValue(
      `Bloq with id : ${bloqId} was deleted with success`
    );

    const result = await deleteBloq(bloqId);

    expect(deleteBloq).toHaveBeenCalledWith(bloqId);
    expect(result).toEqual(`Bloq with id : ${bloqId} was deleted with success`);
  });
});
