import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Movie } from './models/Movie.model';
import { MovieFacade } from './movie-facade.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies$!: Observable<Movie[]>;
  subscription!: Subscription;
  constructor(private movieFacade: MovieFacade) {
    this.movies$ = this.movieFacade.getMovies();
  }

  ngOnInit(): void {
    this.subscription = this.movieFacade.loadMovies().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateMovies(movieId: string) {
    this.movieFacade.updateMovies(movieId);
  }

}
