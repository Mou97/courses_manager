import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { 
    
  }

  getCurrentUser(){
    return this.http.get<any>(`${api_url}/profile`,{headers: {Authorization : localStorage.getItem('token')}})
  }
}
