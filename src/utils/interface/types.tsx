export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  description: string;
  Rating: number;
  comments: string[];
  Plot: string;
  imdbRating: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  BoxOffice: string;
}
export interface RegisterFormInputs {
  name: string;
  email: string;
  phone: string;
  password: string;
}
export interface CommentFormInputs {
  comment: string;
}
export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}
