import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthLoginInfo } from './login-info';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { SignUpInfo } from './signup-info';
import { uptime } from 'os';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
// AuthService: xủ lý xác thục và hoạt động sign up(dang nhập) 
// với server sủ dụng angular HttpClient
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signUrl = 'http://localhost:8080/api/auth/signup';
  constructor(private http: HttpClient) { }
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    console.log("vao dang nhap");
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signUrl, info, httpOptions);
  }

  // trường AuthLoginfo và trường signupinto sẽ validate sử dụng angular template-driven Form
}
