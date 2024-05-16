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
import {
  fetchProductAsync,
  updateProduct,
} from "../redux/actions/productActions";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { validationProductSchema } from "../validation";
import { ImageList } from "../components/imagesList/ImageList";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../components/loading/LoadingComponent";
import { formattingURL } from "../utils";

import NotFound from "../components/notFound/NotFound";

function ProductUpdate() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const productDetail = useAppSelector((state) => state.products.productDetail);
  const user = useAppSelector((state) => state.user.user);

  // useEffect(() => {
  //   if (productDetail?.title) {
  //     const { title, category, price, description, images,inventory } = productDetail;
  //     formik.setValues({
  //       title: title || "",
  //       categoryId: category?.id || 0,
  //       price: price || 0,
  //       description: description || "",
  //       images: images ? images.map((image) => image.url) : [] || null,
  //       inventory: inventory,
  //     });
  //   } else if (id) {
  //     dispatch(fetchProductAsync(parseInt(id)));
  //   }
  // }, [id, dispatch, productDetail]);

  // const handleSubmit = async (values: ProductDto) => {
  //   const updatedImages: string[] = values.images.map((img) =>
  //     img
  //   );
  //   await dispatch(
  //     updateProduct({
  //       id: parseInt(id!),
  //       value: { ...values, images: updatedImages },
  //     })
  //   );
  // };

  // const handleImageDelete = (index: number) => {
  //   const newImages = [...formik.values.images];
  //   newImages.splice(index, 1);
  //   formik.setFieldValue("images", newImages);
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     title: productDetail?.title || "",
  //     categoryId: productDetail?.category?.id || 0,
  //     price: productDetail?.price || 0,
  //     description: productDetail?.description || "",
  //     images: productDetail?.images
  //       ? productDetail.images.map((img) => img.url)
  //       : [],
  //     inventory: productDetail?.inventory
  //   },
  //   validationSchema: validationProductSchema,
  //   onSubmit: handleSubmit,
  // });

  if (user?.role !== "admin") {
    return <NotFound message="Only admin can access this page"></NotFound>;
  }
  if (!productDetail) return <LoadingComponent message="Loading Form" />;
  return (
    <Container maxWidth="sm" style={{ marginTop: "5rem" }}>
      {/* <Typography sx={TitleStyle}>Update the Product</Typography>
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
          value={formattingURL(formik.values.images)}
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
          Update
        </Button>
      </form> */}
    </Container>
  );
}

export default ProductUpdate;
