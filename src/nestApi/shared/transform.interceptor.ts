import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, merge, concat, startWith, tap } from 'rxjs/operators';

export interface Response {
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    const statusCode = of({code: 200})
    console.log('Hello')
    return next.handle().pipe(map(val => ({ code: 200, result: val })));
  }
}