enum LockerStatus {
  OPEN,
  CLOSED,
}

enum RentStatus {
  CREATED,
  WAITING_DROPOFF,
  WAITING_PICKUP,
  DELIVERED,
}

enum RentSize {
  XS,
  S,
  M,
  L,
  XL,
}

export { LockerStatus, RentSize, RentStatus };
