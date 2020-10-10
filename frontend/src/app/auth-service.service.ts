import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { api_url } from 'src/environments/environment';
import { User } from 'src/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser : Observable<User>
  API_URL = api_url;
  
  constructor(private http: HttpClient) {}


  login(email,password) {
      return this.http.post<any>(`${api_url}/users/login`, { email, password })
        
  }
  register (email, password) {
    return this.http.post<any>(`${api_url}/users/register`, { email, password })

  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

}
