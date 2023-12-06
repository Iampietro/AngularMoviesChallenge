import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Movie } from '../../models/Movie.model';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input()
  movie!: Movie;

  @Output() 
  movieId = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    //console.log(this.movie)
  }

  updateMovie(value: string) {
    this.movieId.emit(value);
  }

}
