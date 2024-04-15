enum LockerError {
  NotFound = "not-found",
  Conflict = "conflict",
}

enum BloqError {}

enum PutRentError {
  RentNotFound = "rent-not-found",
  LockerNotFound = "locker-not-found",
  Conflict = "conflict",
}

enum GetError {
  NotFound = "not-found",
}

export { LockerError, GetError, PutRentError };
