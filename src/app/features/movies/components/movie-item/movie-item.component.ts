import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from '../../models/Movie.model';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {

  @Input()
  movie!: Movie;

  @Output() 
  movieId = new EventEmitter<string>();

  constructor() { }

  updateMovie(value: string) {
    this.movieId.emit(value);
  }

}
