import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  private isProduction: boolean = environment.production;
  
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isProduction) {
      request = request.clone({
        setHeaders: {
        'x-api-Key': 'cb530852993c4f119a361653b723c3c9',
        'x-api-Host': 'api.spoonacular.com',
          useQueryString: 'true',
        },
      });
    }
    return next.handle(request);
  }
}