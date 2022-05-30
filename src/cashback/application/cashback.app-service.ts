import { HttpClientService } from './../../core/infra/http-client/http-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CashbackAppService {
  constructor(private readonly httpClient: HttpClientService) {}

  async getTotalCashback(cpf: string): Promise<number> {
    try {
      const {
        data: {
          body: { credit },
        },
      } = await this.httpClient.get(`v1/cashback/`, { cpf });
      return credit;
    } catch (error) {
      throw error;
    }
  }
}
