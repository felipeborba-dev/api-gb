import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

@Injectable()
export class Security {
  encrypt(plainText: string): string {
    try {
      const salt = genSaltSync();
      return hashSync(plainText, salt);
    } catch (error) {
      throw error;
    }
  }
  verify(plainText: string, encryptText: string): boolean {
    return compareSync(plainText, encryptText);
  }
}
