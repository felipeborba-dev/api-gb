import { Type } from '@mikro-orm/core';

export class DecimalType extends Type<number, string> {
  convertToJSValue(value: string) {
    const result = parseFloat(value);
    if (isNaN(result)) {
      return null;
    }
    return result;
  }
}
