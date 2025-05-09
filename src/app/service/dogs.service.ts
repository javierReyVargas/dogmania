import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Dog, ImgDog } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  baseUrl = 'https://dog.ceo/api/';
  private http = inject(HttpClient);

  getAllDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${this.baseUrl}breeds/list/all`)
    .pipe(
      map((response: any) => {
        const breeds = Object.keys(response.message);
        return breeds.map((breed: string) => {
          return {
            breed,
            subBreed: response.message[breed].length > 0 ? response.message[breed] : null
          };
        });
      })
    );
  }

  getImagesByBreed(breed: string): Observable<ImgDog[]> {
    return this.http.get<{message: string[]}>(`${this.baseUrl}breed/${breed}/images`)
      .pipe(
        map(response => {
          return response.message.map((url: string) => {
            return {
              url
            };
          });
        })
      );
  }
  getImagesBySubBreed(breed: string, subBreed: string): Observable<ImgDog[]> {
    return this.http.get<{ message: string[] }>(`${this.baseUrl}breed/${breed}/${subBreed}/images`)
      .pipe(
        map(response => response.message.map((url: string) => {
          return {url};
        }))
      );
  }
}
