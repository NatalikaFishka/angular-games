import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const userData = localStorage.getItem('userData');
            if(userData) {
                const {token} = JSON.parse(userData);
                const cloned = req.clone({
                    headers: req.headers.append("authorization", token)
                });

                return next.handle(cloned)
            }

        return next.handle(req)
    }
    
}