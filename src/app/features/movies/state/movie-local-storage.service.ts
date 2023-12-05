import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieLocalStorage {

  constructor() { }

  getMovies(): Movie[] {
    const movies = window.localStorage.getItem('movies') || '[]';
    return JSON.parse(movies);
  }

  setMovies(movies: Movie[]) {
    window.localStorage.setItem('movies', JSON.stringify(movies))
  }

}
