import { z } from "zod";

const postBloqRequest = z.object({
  title: z.string().min(3),
  address: z.string().min(3),
});

type BloqRequest = z.infer<typeof postBloqRequest>;

export type { BloqRequest };
export { postBloqRequest };
