import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';

import { Movie } from './models/Movie.model';
import { MovieFacade } from './movie-facade.service';
import SORTING_OPTIONS from './utils/sortingOptions';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies$!: Observable<Movie[]>;
  subscription!: Subscription;
  radioButtonControler = new FormControl('');
  constructor(private movieFacade: MovieFacade) {
    this.movies$ = this.movieFacade.getMovies();
  }

  ngOnInit(): void {
    this.subscription = this.movieFacade.loadMovies().subscribe();
    this.radioButtonControler.valueChanges.subscribe(sortOption => {
      this.sort(sortOption);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateMovies(movieId: string): void {
    this.movieFacade.updateMovieStatus(movieId);
  }

  sort(sortOption: string): void {
    this.movies$ = this.movies$.pipe(map((movies: Movie[]) => {
      const sortedMovies = [...movies]
      sortedMovies.sort((a, b) => {
        if (sortOption === SORTING_OPTIONS.RELEASE_DATE) {
          return new Date(a.releaseDate).getTime() < new Date(b.releaseDate).getTime() ? 1 : -1;
        }
        return a[sortOption] < b[sortOption] ? -1 : 1;
      });
      return sortedMovies;
    }));
  }
}
