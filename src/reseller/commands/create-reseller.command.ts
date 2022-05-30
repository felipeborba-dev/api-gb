export class CreateResellerCommand {
  /**
   *
   */
  constructor(
    public readonly cpf: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly email: string,
  ) {}
}
