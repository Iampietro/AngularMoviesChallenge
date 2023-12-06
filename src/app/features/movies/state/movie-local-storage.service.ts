import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieLocalStorage {

  getMovies(): Movie[] {
    const movies = window.localStorage.getItem('movies') || '[]';
    return JSON.parse(movies);
  }

  setMovies(movies: Movie[]) {
    window.localStorage.setItem('movies', JSON.stringify(movies))
  }

  getSavedMovie(): Movie {
    const movie = window.localStorage.getItem('movie') || '[]';
    return JSON.parse(movie);
  }

  saveMovie(movie: Movie) {
    window.localStorage.setItem('movie', JSON.stringify(movie))
  }

}
