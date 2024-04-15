enum DeleteLockerError {
  NotFound = "not-found",
  Conflict = "conflict",
}

enum PutRentError {
  RentNotFound = "rent-not-found",
  LockerNotFound = "locker-not-found",
  Conflict = "conflict",
}

enum PutLockerError {
  BloqNotFound = "bloq-not-found",
  LockerNotFound = "locker-not-found",
}

enum GetError {
  NotFound = "not-found",
}

export { DeleteLockerError, GetError, PutRentError, PutLockerError };
