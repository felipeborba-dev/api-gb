export class UnexpectedParseError implements Error {
  constructor(
    public readonly name = 'unexpected-parse-error',
    public readonly message: string,
    public readonly stack?: string,
  ) {}
}
