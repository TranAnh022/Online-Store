import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { TitleStyle } from "../customizedCSS";
import { ProductDto,} from "../types/type";
import { createProduct } from "../redux/actions/productActions";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { validationProductSchema } from "../validation";
import { ImageList } from "../components/imagesList/ImageList";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import NotFound from "../components/notFound/NotFound";

function ProductCreate() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const initialValues = {
    title: "",
    categoryId: 0,
    price: 0,
    description: "",
    images: [],
  };

  const handleSubmit = (values: ProductDto) => {
    dispatch(createProduct(values));
    formik.resetForm();
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationProductSchema,
    onSubmit: handleSubmit,
  });

  if (user?.role !== "admin" || !user) {
    return <NotFound message="Only admin can access this page"></NotFound>;
  }
  return (
    <Container maxWidth="sm" style={{ marginTop: "5rem" }}>
      <Typography sx={TitleStyle}>Create New Product</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          id="categoryId"
          name="categoryId"
          label="Category"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
          helperText={formik.touched.categoryId && formik.errors.categoryId}
          margin="normal"
        >
          <MenuItem value="0"></MenuItem>
          <MenuItem value="1">Cloth</MenuItem>
          <MenuItem value="2">Electric</MenuItem>
          <MenuItem value="3">Furniture</MenuItem>
          <MenuItem value="4">Shoes</MenuItem>
        </TextField>
        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          margin="normal"
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
        />
        <TextField
          fullWidth
          id="images"
          name="images"
          label="Images (comma-separated)"
          multiline
          rows={4}
          value={formik.values.images.join(",")}
          onChange={(event) => {
            const imageArray = event.target.value.split(",");
            formik.setFieldValue("images", imageArray);
          }}
          error={formik.touched.images && Boolean(formik.errors.images)}
          helperText={formik.touched.images && formik.errors.images}
          margin="normal"
        />
        {formik.values.images.length > 0 && (
          <ImageList
            images={formik.values.images}
            onDelete={handleImageDelete}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ProductCreate;
