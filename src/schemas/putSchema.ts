import { LockerStatus, RentSize, RentStatus } from "@enums/enum";
import { RefinementCtx, z } from "zod";

type RentRequest = {
  lockerId: string | null;
  weight: number;
  status: RentStatus;
  size: RentSize;
};

type LockerRequest = {
  bloqId: string;
  status: LockerStatus;
  isOccupied: boolean;
};

const validateLockerId = (data: RentRequest, ctx: RefinementCtx) => {
  if (data.lockerId === null && data.status !== RentStatus.CREATED) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `A rent cannot change status besides created if not locker is associated`,
      path: ["lockerId", "status"],
    });
  }
};

const validateWeightSize = (data: RentRequest, ctx: RefinementCtx) => {
  const sizeWeightMap = {
    [RentSize.XS]: { minWeight: 1, maxWeight: 5 },
    [RentSize.S]: { minWeight: 5, maxWeight: 10 },
    [RentSize.M]: { minWeight: 10, maxWeight: 25 },
    [RentSize.L]: { minWeight: 25, maxWeight: 50 },
    [RentSize.XL]: { minWeight: 50, maxWeight: 200 },
  };

  const size = data.size;
  const weight = data.weight;

  if (sizeWeightMap[size]) {
    const { minWeight, maxWeight } = sizeWeightMap[size];
    if (weight < minWeight || weight >= maxWeight) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Rent size '${RentSize[size]}' weight must be between ${minWeight} and ${maxWeight} grams`,
        path: ["size", "weight"],
      });
    }
  }
};

const putBloqRequestSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  address: z.string().min(3),
});

const putLockerRequestSchema = z.object({
  bloqId: z.string().uuid(),
  status: z.nativeEnum(LockerStatus),
  isOccupied: z.boolean(),
});

const putRentRequestSchema = z
  .object({
    lockerId: z.string().uuid().nullable(),
    weight: z.number().nonnegative(),
    size: z.nativeEnum(RentSize),
    status: z.nativeEnum(RentStatus),
  })
  .superRefine(validateLockerId)
  .superRefine(validateWeightSize);

type PutBloqRequest = z.infer<typeof putBloqRequestSchema>;
type PutLockerRequest = z.infer<typeof putLockerRequestSchema>;
type PutRentRequest = z.infer<typeof putRentRequestSchema>;

export type { PutBloqRequest, PutLockerRequest, PutRentRequest };
export { putBloqRequestSchema, putLockerRequestSchema, putRentRequestSchema };
