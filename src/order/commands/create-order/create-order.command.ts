export class CreateOrderCommand {
  constructor(
    public readonly code: string,
    public readonly value: number,
    public readonly resellerId: string,
  ) {}
}
