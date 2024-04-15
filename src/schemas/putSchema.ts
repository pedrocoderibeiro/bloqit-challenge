import { z } from "zod";

const putBloqRequestSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  address: z.string().min(3),
});

type PutBloqRequest = z.infer<typeof putBloqRequestSchema>;

export type { PutBloqRequest };
export { putBloqRequestSchema };
