import { isObject } from 'util';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class BadRequestException extends HttpException {
  constructor(message?: string | object | any, error = 'Bad Request') {
    super(BadRequestException.createBody(message, error, HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST)
  }

  static createBody(message: object | string, error?: string, statusCode?: number): object {
    return !message || isObject(message) ? { result: error, statusCode } : { statusCode, result: message, error };
  }
}