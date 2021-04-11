import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    /**
     * Intercepting Http call to add auth token in request
     * @param request:  HttpRequest<any>
     * @param next: HttpHandler
     * @return: Observable<HttpEvent<any>>
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Auth token from environment file
        const {authToken} = environment;

        const authReq = request.clone({
            setHeaders:  {authToken}
        });

        return next.handle(authReq);
    }
}
