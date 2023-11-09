import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiEconomy: string = 'https://api.victorsanmartin.com/economy/indicators.json';
  apiCryptos: string = 'https://api.victorsanmartin.com/economy/cryptos.json';

  constructor(private http: HttpClient) { 
  }

  getDataEconomy(): Observable<any> {
    // Agrega un parámetro único para evitar la caché
    const noCacheUrl = `${this.apiEconomy}?t=${Date.now()}`;
    return this.http.get<any>(noCacheUrl);
  }

  getDataCryptos(): Observable<any> {
    // Agrega un parámetro único para evitar la caché
    const noCacheUrl = `${this.apiCryptos}?t=${Date.now()}`;
    return this.http.get<any>(noCacheUrl);
  }

}
