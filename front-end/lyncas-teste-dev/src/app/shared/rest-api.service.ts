import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: "platform"
})

export class RestApiService {

  // Define API
  apiURL = 'http://localhost:5000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getBooks(term : string): Observable<any> {
    return this.http.get<any>(this.apiURL + "/api/books?p=" + term)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getFavoriteBooks(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/api/books/favorites")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  postFavoriteBook(id: string){
    return this.http.post<any>(this.apiURL + "/api/books/" + id + "/favorite", {})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteFavoriteBook(id: string){
    return this.http.delete<any>(this.apiURL + "/api/books/" + id + "/favorite")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error : any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
