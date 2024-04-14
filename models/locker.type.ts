import { LockerStatus } from "../enums";

type Locker = {
  id: String;
  bloqId: String;
  status: LockerStatus;
  isOccupied: boolean;
};

export type { Locker };
