import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import {
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CartItem } from "../types/type";
import {
  deleteProduct,
  fetchProductAsync,
} from "../redux/actions/productActions";
import { addToCart, updateToCart } from "../redux/slices/cartSlice";
import NotFound from "../components/notFound/NotFound";
import ImageCarousel from "../components/imagesList/ImageCarousel";


function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector((state) => state.products);
  const { cart } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState<number>(0);
  const product = cart?.products.find((p) => p.id === productDetail?.id);
  const user= useAppSelector(state=>state.user.user)

  useEffect(() => {
    if (product && parseInt(id!) === productDetail?.id) {
      setQuantity(product.quantity);
    } else if (id && parseInt(id) !== productDetail?.id) {
      dispatch(fetchProductAsync(parseInt(id)));
    }
  }, [id, product, productDetail, dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.currentTarget.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleUpdateCart = () => {
    if (!product || product.quantity === undefined) {
      dispatch(addToCart({ ...productDetail, quantity } as CartItem));
    }
    if (product && product.quantity !== quantity) {
      dispatch(updateToCart({ id: product.id, quantity: quantity }));
    }
  };

  if (!productDetail) return <NotFound />;
  return (
    <Container sx={{ marginTop: "5rem", marginBottom: "3rem" }}>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <ImageCarousel images={productDetail?.images} />

        </Grid>
        <Grid item md={6}>
          <Typography variant="h3">{productDetail?.title}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${productDetail?.price}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{productDetail.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{productDetail.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>{productDetail?.category?.name}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} sx={{ marginTop: "5px" }}>
            <Grid item md={6}>
              <TextField
                variant="outlined"
                type="number"
                label="Quantity in Cart"
                fullWidth
                value={quantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                disabled={
                  product?.quantity === quantity || (!product && quantity === 0)
                }
                sx={{ height: "55px" }}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                onClick={handleUpdateCart}
              >
                {product ? "Update Quantity" : "Add to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
          {user?.role === "admin" && (
            <Grid container spacing={2} sx={{ marginTop: "5px" }}>
              <Grid item md={6}>
                <LoadingButton
                  sx={{ height: "55px" }}
                  color="error"
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={() => dispatch(deleteProduct(productDetail.id))}
                >
                  Delete
                </LoadingButton>
              </Grid>
              <Grid item xs={6}>
                <LoadingButton
                  sx={{ height: "55px" }}
                  color="secondary"
                  size="large"
                  variant="contained"
                  fullWidth
                  href={`/products/${productDetail.id}/update`}
                >
                  Update
                </LoadingButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;
