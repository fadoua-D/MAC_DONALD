import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler , HttpParams} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { Place } from '../models/place';
import { map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


    urlAPI:string = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=`;
    //urlREs:string = `https://nominatim.openstreetmap.org/search?format=jsonv2&type=restaurant&q=restaurant`;
    urlREs = `https://nominatim.openstreetmap.org/search?format=jsonv2&type=restaurant&addressdetails=1&q=restaurant`;
    baseUrl: string = 'https://nominatim.openstreetmap.org/search';
    
    constructor(private httpClient : HttpClient) {}

    getCitiesByName(cityName: string): Observable<Place[]>{
      return this.httpClient.get<Place[]>(this.urlAPI + cityName)
    }
     

    // getAllRestaurants(cityName: string): Observable<Place[]>{
    //   return this.httpClient.get<Place[]>(this.urlAPI + cityName)
    // }

    getAllRestaurants(cityName: string): Observable<Place[]> {
      const params = new HttpParams()
        .set('q', `McDonald's ${cityName}`)
        .set('format', 'jsonv2')
        .set('limit', '10')
        .set('addressdetails', '1');
    
      console.log('Params:', params.toString());
    
      return this.httpClient
        .get<Place[]>(this.baseUrl, { params })
        .pipe(
          tap((data) => console.log('Data received:', data)),
          catchError((error) => {
            console.error('Error fetching restaurants:', error);
            return throwError(() => new Error('Failed to fetch restaurants'));
          })
        );
    }

    getCityCoordinates(cityName: string) {
      const params = new HttpParams()
        .set('q', cityName)
        .set('format', 'json')
        .set('addressdetails', '1')
        .set('limit', '1'); // Limiter la recherche à 1 résultat
  
      return this.httpClient.get<any>('https://nominatim.openstreetmap.org/search', { params });
    }
     


}