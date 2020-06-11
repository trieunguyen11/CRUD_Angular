import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
// AuthInterceptor kiểm tra và lấy Token từ token-Storage.service
// để thêm Token vào Authorization Header của HTTP Requests
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer' + token) });
        }
        return next.handle(authReq);
    }
}
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];