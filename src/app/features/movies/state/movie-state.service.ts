import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

import { Movie } from '../models/Movie.model';
import { Observable } from 'rxjs';

const initialState: Movie[] = [{
  id: '',
  title: '',
  description: '',
  rating: '',
  duration: '',
  genres: [],
  releaseDate: '',
  trailer: '',
  onWatchList: false,
  imageSrc: ''
}]

@Injectable({
  providedIn: 'root'
})
export class MovieStateService {

  private movieSubject = new BehaviorSubject<Movie[]>(initialState);
  public movies$ = this.movieSubject.asObservable();

  public setMovies(movies: Movie[]) {
    this.movieSubject.next(movies);
  }

  public getMovies(): Observable<Movie[]> {
    return this.movies$;
  }

  getMovieById(movieId: string): Movie {
    return this.movieSubject.value.filter((movie) => movie.id === movieId)[0];
  }

  public updateMovies(movieId: string) {
    const updatedMovies = this.movieSubject.value.map((movie: Movie) => {
      if (movie.id === movieId) {
        return {
          ...movie,
          onWatchList: true
        };
      }
      return movie;
    });
    this.movieSubject.next(updatedMovies);
  }

}
