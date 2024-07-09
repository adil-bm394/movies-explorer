import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/slices/moviesSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CommentFormInputs } from "../../utils/interface/types";
import { toast } from "react-toastify";

interface CommentInputProps {
  movieId: string;
  isLoggedIn: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({ movieId, isLoggedIn }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormInputs>();

  const onSubmit = (data: CommentFormInputs) => {
    if (isLoggedIn) {
      dispatch(addComment({ movieId, comment: data.comment }));
      reset();
    } else {
      toast.error("You must be logged in to add comments.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Add Comment"
        {...register("comment", { required: "Comment is required" })}
        error={!!errors.comment}
        helperText={errors.comment ? errors.comment.message : ""}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default CommentInput;
