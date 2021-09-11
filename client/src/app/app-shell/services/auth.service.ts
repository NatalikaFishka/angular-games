import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthServerResponse, UserData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticatedUserEmail$: ReplaySubject<string | undefined> = new ReplaySubject(1);
  
  constructor(
    private http: HttpClient,
  ) { }

  createNewUser(userData: UserData): Observable<AuthServerResponse> {
    return this.http.post<AuthServerResponse>('/api/auth/register', userData);
  }

  login(userData: UserData): Observable<AuthServerResponse> {
    return this.http.post<AuthServerResponse>('/api/auth/login', userData);
  }

  getAuthenticatedUser(): Observable<AuthServerResponse> {
    return this.http.get<AuthServerResponse>('/api/auth')
  }
  
  logout(): Observable<any> {
    return this.http.delete<AuthServerResponse>('/api/auth/logout')
  }
}
