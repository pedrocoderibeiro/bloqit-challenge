import { LockerStatus } from "@enums/enum";
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

type BloqRequest = z.infer<typeof postBloqRequest>;
type LockerRequest = z.infer<typeof postLockerRequest>;

export type { BloqRequest, LockerRequest };
export { postBloqRequest, postLockerRequest };
