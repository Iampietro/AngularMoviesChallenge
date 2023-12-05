import { Injectable } from '@angular/core';

import { MovieFromApi, Movie } from '../models/Movie.model';
import  movieConstants  from '../utils/movieConstants';

@Injectable({
  providedIn: 'root'
})
export class MovieMapper {

  getImageSrcFromTitle(title: string): string {
    return movieConstants.get(title) || '';
  }

  mapMovies(moviesFromApi: MovieFromApi[]) {
    return moviesFromApi.map((movie: MovieFromApi) => {
      return {
        ...movie,
        onWatchList: false,
        imageSrc: this.getImageSrcFromTitle(movie.title)
      }
    });
  }
}
