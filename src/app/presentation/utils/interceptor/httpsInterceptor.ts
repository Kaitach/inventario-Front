import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clona la solicitud original
    const clonedRequest = req.clone({
      url: req.url.replace('https://', 'http://'),
    });

    // Continúa con la solicitud modificada
    return next.handle(clonedRequest);
  }
}
