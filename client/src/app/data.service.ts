import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  login(user) {
    var response = this.http.post<Object>("https://definedbymovies.herokuapp.com/api/login", user);
    return response;
  }

  saveUser(user): Observable<Object> {
    var response = this.http.post<Object>("https://definedbymovies.herokuapp.com/api/register", user);
    return response;
  }

  searchName(user): Observable<Object> {
    return this.http.post<Object>("https://definedbymovies.herokuapp.com/api/searchName", user);
  }

  simpleSearchMovie(title): Observable<Object> {
    return this.http.get<Object>("http://www.omdbapi.com/?apikey=50fad04b&type=movie&s=" + title);
  }

  addMovie(payload): Observable<Object> {
    return this.http.post<Object>("https://definedbymovies.herokuapp.com/movie/add-movie", payload);
  }

  deleteMovie(payload): Observable<Object> {
    return this.http.post<Object>("https://definedbymovies.herokuapp.com/movie/delete-movie", payload);
  }

  getMovies(payload): Observable<Object> {
    return this.http.post<Object>("https://definedbymovies.herokuapp.com/movie/get-movies", payload);
  }

  getPublicMovies(payload): Observable<Object> {
    return this.http.get<Object>("https://definedbymovies.herokuapp.com/movie/get-public-movies?name="+payload);
  }
}

