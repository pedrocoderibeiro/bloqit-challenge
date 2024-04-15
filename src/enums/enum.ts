enum LockerStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

enum RentStatus {
  CREATED = "CREATED",
  WAITING_DROPOFF = "WAITING_DROPOFF",
  WAITING_PICKUP = "WAITING_PICKUP",
  DELIVERED = "DELIVERED",
}

enum RentSize {
  XS,
  S,
  M,
  L,
  XL,
}

export { LockerStatus, RentSize, RentStatus };
