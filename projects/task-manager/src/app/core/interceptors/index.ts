import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

export const httpInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];
