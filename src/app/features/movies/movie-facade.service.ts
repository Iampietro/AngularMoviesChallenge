import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { MovieService } from './services/movie.service';
import { MovieMapper } from './services/movie-mapper.service';
import { MovieStateService } from './state/movie-state.service';
import { Movie } from './models/Movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieFacade {

  constructor(
    private movieService: MovieService,
    private movieMapper: MovieMapper,
    private movieStateService: MovieStateService,
  ) { }

  getMovies(): Observable<Movie[]> {
    return this.movieStateService.getMovies();
  }

  getMovieById(movieId: string): Movie {
    return this.movieStateService.getMovieById(movieId)
  }

  saveMovie(movie: Movie) {
    this.movieStateService.saveMovie(movie);
  }

  updateMovieStatus(movieId: string): void {
    this.movieStateService.updateMovie(movieId);
  }

  loadMovies(): Observable<Movie[]> {
    return this.movieService.getMovies().pipe(
      map(data => this.movieMapper.mapMovies(data)),
      tap(movies => this.movieStateService.setMovies(movies))
    );
  }
}
