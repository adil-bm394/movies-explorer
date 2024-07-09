import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RatingComponentProps {
  isLoggedIn: boolean;
  initialRating: number | null;
  onRatingClick: (value: number) => void;
}

const RatingComponent: React.FC<RatingComponentProps> = ({
  isLoggedIn,
  initialRating,
  onRatingClick,
}) => {
  const [rating, setRating] = useState<number | null>(initialRating);
  const handleRatingClick = (value: number) => {
    if (isLoggedIn) {
      if (rating === value) {
        setRating(null);
        onRatingClick(0);
      } else {
        setRating(value);
        onRatingClick(value);
      }
    } else {
      toast.error("User must be logged in to rate movies.");
    }
  };

  return (
    <React.Fragment>
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton key={value} onClick={() => handleRatingClick(value)}>
          {rating && rating >= value ? (
            <StarIcon sx={{ color: "yellow" }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ))}
    </React.Fragment>
  );
};

export default RatingComponent;
