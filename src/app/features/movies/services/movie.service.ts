import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import mockedData from './mockedData.json'
import { MovieFromApi } from '../models/Movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(): Observable<MovieFromApi[]> {
    return of(mockedData.movies);
  }
}
