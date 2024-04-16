import { LockerStatus, RentSize, RentStatus } from "@enums/enum";
import { z } from "zod";
import { validateLockerId, validateWeightSize } from "./putSchema";

const postBloqRequest = z.object({
  title: z.string().min(3),
  address: z.string().min(3),
});

const postLockerRequest = z.object({
  bloqId: z.string().uuid(),
  status: z.nativeEnum(LockerStatus),
  isOccupied: z.boolean(),
});

const postRentRequest = z
  .object({
    lockerId: z.string().uuid().nullable(),
    weight: z.number().nonnegative(),
    status: z.nativeEnum(RentStatus).default(RentStatus.CREATED),
    size: z.nativeEnum(RentSize),
  })
  .superRefine(validateLockerId)
  .superRefine(validateWeightSize);

type BloqRequest = z.infer<typeof postBloqRequest>;
type LockerRequest = z.infer<typeof postLockerRequest>;
type RentRequest = z.infer<typeof postRentRequest>;

export type { BloqRequest, LockerRequest, RentRequest };
export { postBloqRequest, postLockerRequest, postRentRequest };
