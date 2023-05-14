import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  data: { list: T };
}

export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return { data: { list: data } };
        }

        return { data };
      }),
    );
  }
}
