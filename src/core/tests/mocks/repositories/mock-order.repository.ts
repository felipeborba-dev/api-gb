import { Reseller } from './../../../../reseller/entities/reseller.entity';
export const mockedResellerRepository = {
  findOneOrFail: (id: string) => {
    return Promise.resolve(
      new Reseller(
        'Test',
        'Reseller',
        '59646547036',
        'test-reseller@test.com',
        '$2b$10$DLdhIFXZB3CZMuoY5jtKG.WANquezEDuB0vqyxI55CzDVlaLNbsTa',
      ),
    );
  },
};
