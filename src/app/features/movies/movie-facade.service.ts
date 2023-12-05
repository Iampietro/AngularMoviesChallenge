import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

import { MovieService } from './services/movie.service';
import { MovieMapper } from './services/movie-mapper.service';
import { MovieStateService } from './state/movie-state.service';
import { Movie } from './models/Movie.model';
import { MovieLocalStorage } from './state/movie-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MovieFacade {

  constructor(
    private movieService: MovieService,
    private movieMapper: MovieMapper,
    private movieStateService: MovieStateService,
    private movieLocalStorage: MovieLocalStorage
  ) { }

  getMovies(): Observable<Movie[]> {
    return this.movieStateService.getMovies();
  }

  updateMovies(movieId: string) {
    this.movieStateService.updateMovies(movieId);
  }

  //If changes were saved in the backend, data coming from API should have the updated movies
  //but since we are working with mockedData I added localstorage logic here
  loadMovies(): Observable<Movie[]> {
    const movies = this.movieLocalStorage.getMovies();
    if (movies.length) {
      this.movieStateService.setMovies(movies);
      return of(movies);
    } else {
      return this.movieService.getMovies().pipe(
        map(data => this.movieMapper.mapMovies(data)),
        tap(movies => this.movieStateService.setMovies(movies))
      );
    }
    
  }
}
