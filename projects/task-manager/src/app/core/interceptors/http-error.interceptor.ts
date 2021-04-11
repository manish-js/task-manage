import { SpinnerService } from './../../components/spinner/spinner.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpErrorService } from '../services/http-error.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private httpErrorService: HttpErrorService,
        private spinnerService: SpinnerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.requestStarted();
        return this.handleError(request, next);
    }

    handleError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse) {
                        this.spinnerService.requestEnded();
                    }
                },
                (error: HttpErrorResponse) => {
                    this.spinnerService.resetSpinner();
                    if (error.error instanceof ErrorEvent) {
                        this.httpErrorService.showError('An error occurred:' + error.error);
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        this.httpErrorService.showError(
                            `Backend returned code ${error.status}, reason: ${error.message}`);
                    }

                    return throwError(
                        'Something bad happened; please try again later.');
                }
            )
        );
    }
}
