export enum ErrorCode {
  BAD_REQUEST = 400,
}

export class HttpError extends Error {
  meta: { cause: string }

  constructor(public code: ErrorCode, cause: string) {
    super(cause)
    this.meta = { cause }
  }
}
