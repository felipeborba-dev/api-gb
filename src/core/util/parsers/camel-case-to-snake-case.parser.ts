import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { UnexpectedParseError } from './errors/unexpected-parse.error';

export function toSnakeCase<T>(obj: any): T {
  try {
    return snakecaseKeys(obj);
  } catch (error) {
    throw new UnexpectedParseError(
      'snakecase-unexpected-parse-error',
      error.message,
      error.stack,
    );
  }
}

export function toCamelCase<T>(obj: any): T {
  try {
    return camelcaseKeys(obj);
  } catch (error) {
    throw new UnexpectedParseError(
      'camelcase-unexpected-parse-error',
      error.message,
      error.stack,
    );
  }
}
