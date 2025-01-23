import { HttpEvent, HttpHeaders, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
//import { AuthService } from '../services/auth.service';

// Angular 17
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private authService: AuthService) {}

//     intercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
//       const headers = new HttpHeaders()
//         .append('Authorization', `Bearer ${this.authService.getToken()}`);
//       const modifiedReq = req.clone({ headers });
//       //return next.handle(modifiedReq);
//       return next(modifiedReq);
//     }
// }

// Angular 19

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    // Inject the current `AuthService` and use it to get an authentication token:
    //const authToken = inject(AuthService).getToken();
    // Clone the request to add the authentication header.
    const newReq = req.clone({
    //   headers: req.headers.append('X-Authentication-Token', authToken),
    //headers: req.headers.append('Access-Control-Allow-Origin', '*'),
    headers: req.headers.append('Access-Control-Allow-Origin', '*'),
      
    });
    return next(newReq);
}
  
