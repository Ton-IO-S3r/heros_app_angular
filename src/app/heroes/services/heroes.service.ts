import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private API_URL = environment.API_URL
  constructor(private http: HttpClient) { }
  
  getHeroes = (): Observable<Heroe[]> => {
    return this.http.get<Heroe[]>(`${this.API_URL}/heroes`)
  }
  getHero = (id: string): Observable<Heroe> => {
    return this.http.get<Heroe>(`${this.API_URL}/heroes/${id}`)
  }
  
  getSearchSuggestions = (termino: string): Observable<Heroe[]> => {
    return this.http.get<Heroe[]>(`${this.API_URL}/heroes?q=${termino}&_limit=5`)
  }
}
