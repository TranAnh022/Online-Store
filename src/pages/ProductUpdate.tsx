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
import { useEffect, useState } from "react";
import LoadingComponent from "../components/loading/LoadingComponent";
import NotFound from "../components/notFound/NotFound";
import { useParams } from "react-router-dom";

function ProductUpdate() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const productDetail = useAppSelector((state) => state.products.productDetail);
  const user = useAppSelector((state) => state.user.user);
  const [imageUrl, setImageUrl] = useState("");
  const {categories}= useAppSelector(state=>state.products)

  useEffect(() => {
    if (!id) return;
    if (productDetail?.title) {
      const { title, category, price, description, images, inventory } =
        productDetail;
      formik.setValues({
        title: title || "",
        categoryId: category?.id || 0,
        price: price || 0,
        description: description || "",
        imageUrls: images ? images.map((image) => image.url) : [],
        imageFiles: [], // Assuming no files are available initially
        inventory: inventory || 0,
      });
    }
    if (id !== productDetail?.id.toString()) {
      dispatch(fetchProductAsync(id));
    }
  }, [id, dispatch, productDetail]);

  const handleSubmit = async (values: ProductDto) => {
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

    await dispatch(
      updateProduct({
        id: id!,
        value: formData,
      })
    );
  };

  const handleImageDelete = (index: number) => {
    const newImageUrls = [...formik.values.imageUrls];
    newImageUrls.splice(index, 1);
    formik.setFieldValue("imageUrls", newImageUrls);
  };

  const handleImageUrlAdd = () => {
    if (imageUrl) {
      formik.setFieldValue("imageUrls", [...formik.values.imageUrls, imageUrl]);
      setImageUrl("");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: productDetail?.title || "",
      categoryId: productDetail?.category?.id || 0,
      price: productDetail?.price || 0,
      description: productDetail?.description || "",
      imageUrls: productDetail?.images
        ? productDetail.images.map((img) => img.url)
        : [],
      imageFiles: [],
      inventory: productDetail?.inventory || 0,
    },
    validationSchema: validationProductSchema,
    onSubmit: handleSubmit,
  });

  if (user?.role !== "Admin") {
    return <NotFound message="Only admin can access this page"></NotFound>;
  }
  if (!productDetail) return <LoadingComponent message="Loading Form" />;

  return (
    <Container maxWidth="sm" style={{ marginTop: "5rem" }}>
      <Typography sx={TitleStyle}>Update the Product</Typography>
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
          {categories?.map((category) => (
            <MenuItem value={category.id}>{category.name}</MenuItem>
          ))}
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
          id="inventory"
          name="inventory"
          label="Inventory"
          type="number"
          value={formik.values.inventory}
          onChange={formik.handleChange}
          error={formik.touched.inventory && Boolean(formik.errors.inventory)}
          helperText={formik.touched.inventory && formik.errors.inventory}
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
                ...formik.values.imageFiles,
                ...files,
              ]);
            }
          }}
          style={{ width: "100%" }}
        />
        {formik.values.imageUrls.length > 0 && (
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
          Update
        </Button>
      </form>
    </Container>
  );
}

export default ProductUpdate;
