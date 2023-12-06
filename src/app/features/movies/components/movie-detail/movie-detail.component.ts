import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieFacade } from '../../movie-facade.service';
import { Movie } from '../../models/Movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie = { 
    id: '', 
    description: '', 
    title: '', 
    rating: '', 
    duration: '', 
    genres: [], 
    trailer: '', 
    releaseDate: '', 
    onWatchList: false, 
    imageSrc: ''
  };

  constructor(
    private route: ActivatedRoute,
    private movieFacade: MovieFacade,
    
  ) { }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.movie = this.movieFacade.getMovieById(id);
  }

  updateMovie(value: string) {
    this.movie = {...this.movie, onWatchList: !this.movie.onWatchList};
    this.movieFacade.saveMovie(this.movie);
    this.movieFacade.updateMovieStatus(value);
  }

  ngOnInit(): void {
    this.getMovie();
  }

}
