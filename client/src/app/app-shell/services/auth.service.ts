import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { AppStore } from 'src/app/app-store.model';
import { clearGameResultsInStore } from 'src/app/game-page/store/actions/game-result.actions';
import { AuthServerResponse, UserData } from '../models';
import { logout } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USER_DATA: string = 'userData';
  public authenticatedUserEmail$: ReplaySubject<string | undefined> = new ReplaySubject(1);
  
  constructor(
    private http: HttpClient,
    private store: Store<AppStore>
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

  logout(): void {
    this.store.dispatch(logout());
    this.store.dispatch(clearGameResultsInStore());
    // this.clearLocalStorage();
  }

  // setUserDataToLocalStorage(resUserData: AuthServerResponse): void {
  //   const { token } = resUserData;
  //   localStorage.setItem(this.USER_DATA, JSON.stringify({token}));
  // }

  // clearLocalStorage(): void {
  //   localStorage.removeItem(this.USER_DATA);
  // }
}
