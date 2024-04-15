import { LockerStatus, RentSize } from "@enums/enum";
import { z } from "zod";

const postBloqRequest = z.object({
  title: z.string().min(3),
  address: z.string().min(3),
});

const postLockerRequest = z.object({
  bloqId: z.string().uuid(),
  status: z.nativeEnum(LockerStatus),
  isOccupied: z.boolean(),
});

const postRentRequest = z.object({
  lockerId: z.string().uuid().nullable(),
  weight: z.number().nonnegative(),
  size: z.nativeEnum(RentSize),
});

type BloqRequest = z.infer<typeof postBloqRequest>;
type LockerRequest = z.infer<typeof postLockerRequest>;
type RentRequest = z.infer<typeof postRentRequest>;

export type { BloqRequest, LockerRequest, RentRequest };
export { postBloqRequest, postLockerRequest, postRentRequest };
