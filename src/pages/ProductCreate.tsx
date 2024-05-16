import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { TitleStyle } from "../customizedCSS";
import { ProductDto } from "../types/type";
import { createProduct } from "../redux/actions/productActions";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { validationProductSchema } from "../validation";
import { ImageList } from "../components/imagesList/ImageList";
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
    inventory: 0,
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
          <MenuItem value="50e3ad7f-f268-4c03-a632-05b0c2a03245">
            Home Goods
          </MenuItem>
          <MenuItem value="91c88378-e3fd-4d73-8b19-9580cebbaab7">Toys</MenuItem>
          <MenuItem value="c517d50f-b81f-4bc6-90a0-25dc149338a0">
            Electronics
          </MenuItem>
          <MenuItem value="f2cf5c47-e213-49a7-9a71-52a3bbb7c9eb">
            Shoes
          </MenuItem>
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
