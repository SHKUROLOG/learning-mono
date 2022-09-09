import { ErrorCode, HttpError } from './HttpError'

export class InvalidIdError extends HttpError {
  constructor(source: any) {
    super(ErrorCode.BAD_REQUEST, `invalid id is NaN: "${source}"`)
  }
}
