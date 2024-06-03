import React from "react";
import ReviewCard from "./ReviewCard";
import Rating from "./Rating";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Typography,
  Box,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Review } from "../../types/type";
import { useAppSelector, useAppDispatch } from "../../redux/configureStore";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createReviewAsync } from "../../redux/actions/reviewAction";

type Props = {
  reviews: Review[] | null;
};

const validationSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .required("Rating is required"),
  comment: Yup.string().required("Comment is required"),
});

function Reviews({ reviews }: Props) {
  const { productDetail } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleReviewSubmit = (
    values: { rating: number; comment: string },
    { resetForm }: FormikHelpers<{ rating: number; comment: string }>
  ) => {
    if (productDetail) {
      const review = {
        productId: productDetail.id,
        context: values.comment,
        rating: values.rating,
      };

      dispatch(createReviewAsync(review));
      resetForm();
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h3" gutterBottom>
        Reviews
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Write a review</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formik
            initialValues={{ rating: 0, comment: "" }}
            validationSchema={validationSchema}
            onSubmit={handleReviewSubmit}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => (
              <Form>
                <Box display="flex" flexDirection="column" gap="1rem">
                  <Rating
                    count={5}
                    value={values.rating}
                    edit={true}
                    onChange={(value) => setFieldValue("rating", value)}
                  />
                  {errors.rating && touched.rating && (
                    <Typography color="error">{errors.rating}</Typography>
                  )}
                  <Field
                    as={TextField}
                    id="comment"
                    name="comment"
                    label="Leave a comment here ..."
                    multiline
                    rows={3}
                    variant="outlined"
                    value={values.comment}
                    onChange={handleChange}
                    fullWidth
                    error={touched.comment && Boolean(errors.comment)}
                    helperText={touched.comment && errors.comment}
                  />
                  <Button type="submit" variant="contained" color="warning">
                    Send
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ mt: 2 }}>
        {reviews?.map(
          (review) =>
            productDetail?.id === review.productId && (
              <ReviewCard key={review.id} review={review} />
            )
        )}
      </Box>
    </Container>
  );
}

export default Reviews;
