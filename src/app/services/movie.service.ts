import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { MovieCreditsResponse, Cast } from '../interfaces/response';
import {
  TmdbResponse,
  Movie,
  MovieDetailResponse,
} from '../interfaces/response';

interface MyParams {
  [param: string]: string | string[];
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://api.themoviedb.org/3';
  private pageParams = 1;
  private inProcess = false;

  constructor(private http: HttpClient) {}

  get params(): MyParams {
    return {
      api_key: '525717d8168ac159276e156507c56f6d',
      language: 'en-US',
      page: this.pageParams.toString(),
    };
  }

  resetpageParams(): void {
    this.pageParams = 1;
  }

  searchMovie(search: string): Observable<Movie[]> {
    this.inProcess = true;
    if (!this.inProcess) {
      return of([]);
    }
    return this.http
      .get<TmdbResponse>(`${this.url}/search/movie`, {
        params: { ...this.params, query: search },
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          (this.pageParams += 1), (this.inProcess = false);
        })
      );
  }

  getMovies(): Observable<Movie[]> {
    this.inProcess = true;
    if (!this.inProcess) {
      return of([]);
    }
    return this.http
      .get<TmdbResponse>(`${this.url}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          (this.pageParams += 1), (this.inProcess = false);
        })
      );
  }

  getMovieDetail(id: string): Observable<MovieDetailResponse> {
    return this.http
      .get<MovieDetailResponse>(`${this.url}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  getMovieCredits(id: string): Observable<Cast[]> {
    return this.http
      .get<MovieCreditsResponse>(`${this.url}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of([]))
      );
  }
}
