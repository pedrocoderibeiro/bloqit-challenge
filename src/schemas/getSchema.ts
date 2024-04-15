import { LockerStatus, RentSize, RentStatus } from "@enums/enum";
import { z } from "zod";

const lockerQuerParams = z.object({
  bloqId: z.string().uuid().optional(),
  status: z.nativeEnum(LockerStatus).optional(),
  isOccupied: z.boolean().optional(),
});

const rentQueryParams = z.object({
  lockerId: z.string().uuid().optional(),
  size: z.nativeEnum(RentSize).optional(),
  status: z.nativeEnum(RentStatus).optional(),
});

type LockerQueryParams = z.infer<typeof lockerQuerParams>;
type RentQueryParams = z.infer<typeof rentQueryParams>;

export type { RentQueryParams };
export { rentQueryParams, lockerQuerParams };
