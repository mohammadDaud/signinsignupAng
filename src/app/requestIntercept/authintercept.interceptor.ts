import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';

@Injectable()
export class AuthinterceptInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthserviceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUserValue;
        if (request.url.includes(`${this.authenticationService.getUrl()}/api/signin/login`)) {
            return next.handle(request);
        }
        if (request.url.includes(`${this.authenticationService.getUrl()}/api/signup/signup`)) {
            return next.handle(request);
        }
        if (request.url.includes(`${this.authenticationService.getUrl()}/api/signin/forget`)) {
            return next.handle(request);
        }
        if (!request.url.includes('signin/login')) {
            if (currentUser && currentUser['jwttoken']) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser['jwttoken']}`
                    }
                });
            }
        }

        return next.handle(request);
    }
}
