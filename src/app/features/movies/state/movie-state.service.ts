import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

import { Movie } from '../models/Movie.model';
import { MovieLocalStorage } from '../state/movie-local-storage.service';

const initialState: Movie[] = []

@Injectable({
  providedIn: 'root'
})
export class MovieStateService {

  constructor(private movieLocalStorage: MovieLocalStorage) {}

  private movieSubject = new BehaviorSubject<Movie[]>(initialState);
  public movies$ = this.movieSubject.asObservable();

  public setMovies(movies: Movie[]) {
    const moviesFromLS = this.movieLocalStorage.getMovies();
    if (moviesFromLS.length) {
      this.movieSubject.next(moviesFromLS)
    } else {
      this.movieSubject.next(movies);
    }
  }

  public getMovies(): Observable<Movie[]> {
    return this.movies$;
  }

  public getMovieById(movieId: string): Movie {
    const movieToRetrieve = this.movieSubject.value.filter((movie) => movie.id === movieId)[0];
    if (movieToRetrieve) {
      this.movieLocalStorage.saveMovie(movieToRetrieve);
      return movieToRetrieve;
    } else {
      return this.movieLocalStorage.getSavedMovie();
    }
  }

  public saveMovie(movie: Movie) {
    this.movieLocalStorage.saveMovie(movie);
  }

  public updateMovie(movieId: string) {
    let movieArray;
    if (this.movieSubject.value.length) {
      movieArray = this.movieSubject.value;
    } else {
      movieArray = this.movieLocalStorage.getMovies();
    }
    const updatedMovies = movieArray.map((movie: Movie) => {
      if (movie.id === movieId) {
        if (!movie.onWatchList) {
          return {
            ...movie,
            onWatchList: true
          };
        }
        return { // If it's the movie and is already in watchlist, we delete it
          ...movie,
          onWatchList: false
        };
      }
      return movie;
    });
    this.movieLocalStorage.setMovies(updatedMovies);
    this.movieSubject.next(updatedMovies);
  }

}
