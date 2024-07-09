import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie } from '../../utils/interface/types';

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/');
  const movies = response.data.map((movie: Movie) => ({
    ...movie,
    comments: [],
  }));
  return movies;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ movieId: string; comment: string }>) => {
      const { movieId, comment } = action.payload;
      const movie = state.movies.find(m => m.imdbID === movieId);
      if (movie) {
        movie.comments.push(comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const { addComment } = moviesSlice.actions;
export default moviesSlice.reducer;
