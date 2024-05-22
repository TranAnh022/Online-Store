import React from "react";
import Rating from "./Rating";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { Review } from "../../types/type";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { deleteReviewAsync } from "../../redux/actions/reviewAction";

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function handleDelete(event: any) {
    event.preventDefault();
    dispatch(deleteReviewAsync(review.id));
  }

  return (
    <Card sx={{ mt: 2, boxShadow: 3 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 2 }}>{review.user.avatar}</Avatar>
            <Typography variant="subtitle1" component="div">
              {review.user.name}
            </Typography>
          </Box>
          {review.user.id === user?.id ||
            (user?.role === "Admin" && (
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            ))}
        </Box>
        <Rating value={review?.rating} count={5} />
        <Typography variant="body1" component="p" sx={{ p: 1 }}>
          {review?.context}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
