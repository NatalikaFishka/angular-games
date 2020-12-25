import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthServerResponse, UserData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USER_DATA: string = 'userData';
  public authenticatedUserEmail$: ReplaySubject<string | undefined> = new ReplaySubject(1);
  
  constructor(
    private http: HttpClient
  ) { }

  createNewUser(userData: UserData): Observable<AuthServerResponse> {
    return this.http.post<AuthServerResponse>('/api/auth/register', userData);
  }

  login(userData: UserData): Observable<AuthServerResponse> {
    return this.http.post<AuthServerResponse>('/api/auth/login', userData);
  }

  getAuthenticatedUser(token: string): Observable<AuthServerResponse> {
    return this.http.get<AuthServerResponse>('/api/auth', {
      headers: {
        "authorization": token
      }
    })
  }

  logout(): void {
    this.authenticatedUserEmail$.next(undefined);
    this.clearLocalStorage();
  }

  setAuthenticatedUser(resUserData: AuthServerResponse): void {
    this.authenticatedUserEmail$.next(resUserData.email);
    this.setUserDataToLocalStorage(resUserData);
  }

  setUserDataToLocalStorage(resUserData: AuthServerResponse): void {
    const {email, token, userId} = resUserData;
    localStorage.setItem(this.USER_DATA, JSON.stringify({email, token, userId}));
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.USER_DATA);
  }

  setUserFromLocalStorage(): void {
      const userData = localStorage.getItem(this.USER_DATA);

    if(userData) {
      const {token} = JSON.parse(userData);
      this.getAuthenticatedUser(token).subscribe(
        (email) => this.authenticatedUserEmail$.next(email.email),
        () => this.clearLocalStorage()
      )
    } 
  }
}
