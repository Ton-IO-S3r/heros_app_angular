import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = environment.API_URL;
  private _auth: User | undefined;
  
  get currentUser(): User{
    return {...this._auth!}
  }
  constructor(private http: HttpClient) { }

  login = () => {
    return this.http.get<User>(`${this.API_URL}/usuarios/1`)
               .pipe(
                 tap( auth_user => this._auth = auth_user),
                 tap( auth_user => localStorage.setItem('token',auth_user.id)),
               )
  }

  verificarAutenticacion = (): Observable<boolean> => {
    if (!localStorage.getItem('token')) {
      return of(false)
    }
    return this.http.get<User>(`${this.API_URL}/usuarios/1`)
               .pipe(
                 map( user => {
                   this._auth = user
                   return true
                 })
               )
  }

  logout = () => {
    this._auth = undefined;
    localStorage.removeItem('token')
  }
}
