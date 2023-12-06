import { Injectable } from '@angular/core';

import { MovieFromApi, Movie } from '../models/Movie.model';
import  imageSources  from '../utils/imageSources';

@Injectable({
  providedIn: 'root'
})
export class MovieMapper {

  getImageSrcFromTitle(title: string): string {
    return imageSources.get(title) || '';
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
