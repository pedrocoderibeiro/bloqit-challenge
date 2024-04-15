import { LockerStatus, RentSize, RentStatus } from "@enums/enum";
import { z } from "zod";

const putBloqRequestSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  address: z.string().min(3),
});

const putLockerRequestSchema = z.object({
  id: z.string().uuid(),
  bloqId: z.string().uuid(),
  status: z.nativeEnum(LockerStatus),
  isOccupied: z.boolean(),
});

const putRentRequestSchema = z.object({
  id: z.string().uuid(),
  lockerId: z.string().uuid().nullable(),
  weight: z.number().nonnegative(),
  size: z.nativeEnum(RentSize),
  status: z.nativeEnum(RentStatus),
});

type PutBloqRequest = z.infer<typeof putBloqRequestSchema>;
type PutLockerRequest = z.infer<typeof putLockerRequestSchema>;
type PutRentRequest = z.infer<typeof putRentRequestSchema>;

export type { PutBloqRequest, PutLockerRequest, PutRentRequest };
export { putBloqRequestSchema, putLockerRequestSchema, putRentRequestSchema };
