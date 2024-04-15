import { RentSize, RentStatus } from "../enums";

type Rent = {
  id: String;
  lockerId: string | null;
  weight: number;
  size: RentSize;
  status: RentStatus;
};

export type { Rent };
