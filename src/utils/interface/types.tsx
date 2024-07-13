export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
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
  comments: { userId: string; userName: string; comment: string }[];
  ratings: { userId: string; userName: string; rating: number }[];
}

export interface RegisterFormInputs {
  id?: string; // Added the `id` field for storing user IDs
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
