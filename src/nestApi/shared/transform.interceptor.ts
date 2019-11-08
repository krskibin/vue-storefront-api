import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number
  result: T|Array<T>
  meta?: T|Array<T>
}


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const statusCode = of({code: 200})
    console.log('Hello')
    return next.handle().pipe(map(val => ({ code: 200, result: val })));
  }
}