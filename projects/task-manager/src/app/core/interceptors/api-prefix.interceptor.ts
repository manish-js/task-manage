import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

    /**
     * Intercepting Http call to change http to https
     * @param request:  HttpRequest<any>
     * @param next: HttpHandler
     * @return: Observable<HttpEvent<any>>
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const secureReq = req.clone({
            url: req.url.replace('http://', 'https://')
        });

        return next.handle(secureReq);
    }
}
