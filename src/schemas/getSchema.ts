import { RentSize, RentStatus } from "@enums/enum";
import { z } from "zod";

const rentQueryParams = z.object({
  lockerId: z.string().uuid().optional(),
  size: z.nativeEnum(RentSize).optional(),
  status: z.nativeEnum(RentStatus).optional(),
});

type RentQueryParams = z.infer<typeof rentQueryParams>;

export type { RentQueryParams };
export { rentQueryParams };
