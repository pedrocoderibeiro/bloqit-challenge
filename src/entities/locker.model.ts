import { LockerStatus } from "../enums";

type Locker = {
  id: String;
  bloqId: String;
  status: LockerStatus;
  isOccupied: boolean;
  updatedAt?: Date;
};

export type { Locker };
