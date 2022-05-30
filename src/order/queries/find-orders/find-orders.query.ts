export class FindOrdersQuery {
  constructor(
    public readonly resellerId: string,
    public readonly limit: number = 100,
    public readonly offset: number = 0,
  ) {}
}
