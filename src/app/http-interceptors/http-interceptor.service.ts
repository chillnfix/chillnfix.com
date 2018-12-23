import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private readonly DOMAIN = 'http://localhost:5000/chillnfix-dev/us-central1'
  // private readonly DOMAIN = 'https://us-central1-chillnfix-dev.cloudfunctions.net'
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
      url: `${this.DOMAIN}${req.url}`
    })
    return next.handle(cloneReq);
  }
}
