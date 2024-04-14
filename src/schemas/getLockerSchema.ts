import { LockerStatus } from "@enums/enum";
import { z } from "zod";

const lockerQueryParams = z.object({
  bloqId: z.string().optional(),
  status: z.nativeEnum(LockerStatus).optional(),
  isOccupied: z.coerce.boolean().optional(),
});

type LockerQueryParams = z.infer<typeof lockerQueryParams>;

export type { LockerQueryParams };
export { lockerQueryParams };
