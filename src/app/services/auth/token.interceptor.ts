import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelperService } from '../helper/helper.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,public helperService:HelperService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let ls = localStorage.getItem('currentUser');
        if(ls){
            let currentUser = JSON.parse(ls);
            console.log(currentUser);
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        authtoken: `${currentUser.token}`
                    }
                });                
            }
        }
        return next.handle(request);
            
        }
        
    }
