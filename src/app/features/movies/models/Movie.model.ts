export interface MovieFromApi {
  id: string;
  title: string;
  description: string;
  rating: string;
  duration: string;
  genres: string[];
  releaseDate: string;
  trailer: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  rating: string;
  duration: string;
  genres: string[];
  releaseDate: string;
  trailer: string;
  onWatchList: boolean;
  imageSrc: string;
}