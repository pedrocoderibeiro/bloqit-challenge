import { LockerStatus, RentSize, RentStatus } from "@enums/enum";
import { z } from "zod";

const bloqQueryParams = z.object({
  title: z.string().optional(),
  address: z.string().optional(),
});

const lockerQueryParams = z.object({
  bloqId: z.string().uuid().optional(),
  status: z.nativeEnum(LockerStatus).optional(),
  isOccupied: z.boolean().optional(),
});

const rentQueryParams = z.object({
  lockerId: z.string().uuid().optional(),
  size: z.nativeEnum(RentSize).optional(),
  status: z.nativeEnum(RentStatus).optional(),
});

type BloqQueryParams = z.infer<typeof bloqQueryParams>;
type LockerQueryParams = z.infer<typeof lockerQueryParams>;
type RentQueryParams = z.infer<typeof rentQueryParams>;

export type { BloqQueryParams, LockerQueryParams, RentQueryParams };
export { rentQueryParams, lockerQueryParams, bloqQueryParams };
