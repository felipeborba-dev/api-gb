import { DynamicModule, Module } from '@nestjs/common';

import { AxiosRequestConfig } from 'axios';
import { HttpClientService } from './http-client.service';

@Module({})
export class HttpClientModule {
  static forRoot(baseConfig: AxiosRequestConfig): DynamicModule {
    return {
      module: HttpClientModule,
      providers: [
        {
          provide: HttpClientService,
          useValue: new HttpClientService(baseConfig),
        },
      ],
      exports: [HttpClientService],
    };
  }
}
