import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import  Box  from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import  CardMedia from '@mui/material/CardMedia';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addComment } from '../../redux/slices/moviesSlice';
import { useForm } from 'react-hook-form';
import { CommentFormInputs } from '../../utils/interface/types';


const MoviesDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id;

  const movie = useSelector((state: RootState) => state.movies.movies.find(m => m.imdbID === movieId));
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<CommentFormInputs>();

  if (!movie) {
    return <Typography>Movie not found</Typography>;
  }

  const onSubmit = (data: CommentFormInputs) => {
    dispatch(addComment({ movieId: movie.imdbID, comment: data.comment }));
  };

  return (
    <Container>
      <Card sx={{ marginTop: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <CardMedia
            component="img"
            alt={movie.Title}
            height="460"
            image={movie.Poster}
            title={movie.Title}
            sx={{ flex: '1 1 auto', maxWidth: '100%' }}
          />
        
          <CardContent sx={{ flex: '1 1 auto', maxWidth: '100%' }}>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.Title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {movie.Plot}
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body1"><strong>Year:</strong> {movie.Year}</Typography>
              <Typography variant="body1"><strong>Rated:</strong> {movie.imdbRating}</Typography>
              <Typography variant="body1"><strong>Released:</strong> {movie.Released}</Typography>
              <Typography variant="body1"><strong>Runtime:</strong> {movie.Runtime}</Typography>
              <Typography variant="body1"><strong>Genre:</strong> {movie.Genre}</Typography>
              <Typography variant="body1"><strong>Director:</strong> {movie.Director}</Typography>
              <Typography variant="body1"><strong>Writer:</strong> {movie.Writer}</Typography>
              <Typography variant="body1"><strong>Actors:</strong> {movie.Actors}</Typography>
              <Typography variant="body1"><strong>Language:</strong> {movie.Language}</Typography>
              <Typography variant="body1"><strong>Country:</strong> {movie.Country}</Typography>
              <Typography variant="body1"><strong>Awards:</strong> {movie.Awards}</Typography>
              <Typography variant="body1"><strong>BoxOffice:</strong> {movie.BoxOffice}</Typography>
            </Box>
          </CardContent>
        </Box>

        <CardContent>
          {isLoggedIn && (
            <Box sx={{ marginTop: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Add Comment"
                  {...register('comment', { required: 'Comment is required' })}
                  error={!!errors.comment}
                  helperText={errors.comment ? errors.comment.message : ''}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </Box>
          )}

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Comments:</Typography>
            {movie.comments.length > 0 ? (
              movie.comments.map((comment, index) => (
                <Box key={index} sx={{ marginTop: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    {comment}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments yet.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MoviesDetailPage;
