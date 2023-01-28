export class ErrorMessage {
  constructor(readonly code: number, readonly message: string) {}
}

export class Result<T> {
  constructor(readonly data: T) {}
}
