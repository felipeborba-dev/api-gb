import { Test, TestingModule } from '@nestjs/testing';

import { Reseller } from '../entities/reseller.entity';
import { ResellerFactory } from './reseller.factory';
import { Security } from './../../core/application/security/crypto.security';

describe('ResellersFactory', () => {
  let factory: ResellerFactory;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Security, ResellerFactory],
    }).compile();
    factory = module.get<ResellerFactory>(ResellerFactory);
  });
  it('should be defined', () => {
    expect(factory).toBeDefined();
  });
  it('should be defined create reseller ', () => {
    const reseller = factory.create({
      firstName: 'John',
      lastName: 'Doe',
      cpf: '01234567890',
      email: 'test@test.com',
      password: '123456',
    });
    expect(reseller instanceof Reseller).toEqual(true);
  });
});
