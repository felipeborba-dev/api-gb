export class FindOrderByIdQuery {
  constructor(
    public readonly resellerId: string,
    public readonly orderId: string,
  ) {}
}
