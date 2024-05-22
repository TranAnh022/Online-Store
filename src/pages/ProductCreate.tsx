import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
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
  const [imageUrl, setImageUrl] = useState("");

  const initialValues: ProductDto = {
    title: "",
    categoryId: 0,
    price: 0,
    description: "",
    imageUrls: [], // Default value as empty array
    imageFiles: [], // Default value as empty array
    inventory: 0,
  };

  const handleSubmit = (values: ProductDto) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("categoryId", values.categoryId.toString());
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("inventory", values.inventory.toString());

    (values.imageUrls || []).forEach((url, index) => {
      formData.append(`imageUrls[${index}]`, url);
    });

    (values.imageFiles || []).forEach((file, index) => {
      formData.append(`imageFiles[${index}]`, file);
    });

    dispatch(createProduct(formData));
    formik.resetForm();
  };

  const handleImageDelete = (index: number) => {
    const newImageUrls = [...formik.values.imageUrls!];
    newImageUrls.splice(index, 1);
    formik.setFieldValue("imageUrls", newImageUrls);
  };

  const handleImageUrlAdd = () => {
    if (imageUrl) {
      formik.setFieldValue("imageUrls", [
        ...formik.values.imageUrls!,
        imageUrl,
      ]);
      setImageUrl("");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationProductSchema,
    onSubmit: handleSubmit,
  });

  if (user?.role !== "Admin" || !user) {
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
          id="imageUrl"
          name="imageUrl"
          label="Image URL"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          margin="normal"
        />
        <Button
          onClick={handleImageUrlAdd}
          variant="outlined"
          style={{ marginBottom: "1rem" }}
        >
          Add Image URL
        </Button>
        <input
          id="imageFiles"
          name="imageFiles"
          type="file"
          multiple
          onChange={(event) => {
            if (event.target.files) {
              const files = Array.from(event.target.files);
              formik.setFieldValue("imageFiles", [
                ...formik.values.imageFiles!,
                ...files,
              ]);
            }
          }}
          style={{ width: "100%" }}
        />
        {formik.values.imageUrls && formik.values.imageUrls.length > 0 && (
          <ImageList
            images={formik.values.imageUrls}
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
