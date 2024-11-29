import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAPICharacter, Result } from './interface/character';
import { catchError, firstValueFrom, Observable, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyServiceService {
  private baseUrl = 'https://rickandmortyapi.com/api';
  private errors : string[] = [];
  private http = inject(HttpClient);

  async getAllCharacters(page: number = 1): Promise<ResponseAPICharacter>{
    try{
      const response = await firstValueFrom(this.http.get<ResponseAPICharacter>(`${this.baseUrl}/character?page=${page}`));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error getAllCharacters', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  searchCharacters(name: string): Observable<Result[]> {
    return this.http.get<ResponseAPICharacter>(`${this.baseUrl}/character?name=${name}`).pipe(
      catchError(this.handleError),
      map(response => response.results.filter(character => character.name.toLowerCase() === name.toLowerCase()))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
