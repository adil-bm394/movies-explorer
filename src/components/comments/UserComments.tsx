import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface UserCommentsProps {
  comments: { userId: string; userName: string; comment: string }[];
}

const UserComments: React.FC<UserCommentsProps> = ({ comments }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6">Comments:</Typography>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Box key={index} sx={{ marginTop: 1 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>{comment.userName}</strong>: {comment.comment}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No comments yet.
        </Typography>
      )}
    </Box>
  );
};

export default UserComments;