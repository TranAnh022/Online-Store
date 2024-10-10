import  { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import {
  Box,
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
import {
  deleteProduct,
  fetchProductAsync,
} from "../redux/actions/productActions";
import ImageCarousel from "../components/imagesList/ImageCarousel";
import LoadingComponent from "../components/loading/LoadingComponent";
import Marquee from "../components/marquee/Marquee";
import {
  addCartItemAsync,
  removeCartItemAsync,
} from "../redux/actions/cartAction";
import Reviews from "../components/review/Reviews";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { productDetail } = useAppSelector((state) => state.products);
  const productInCart = cart?.items.find(
    (p) => p.product.id === productDetail?.id
  );
  const [quantity, setQuantity] = useState<number>(0);
  const user = useAppSelector((state) => state.user.user);
  const { loading } = useAppSelector((state) => state.products);
  const { reviews } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (productInCart && productDetail?.id === productInCart.product.id)
      setQuantity(productInCart.quantity);
    if (id && productDetail?.id.toString() !== id)
      dispatch(fetchProductAsync(id));
    if (!productInCart) setQuantity(0);
  }, [id, productInCart, productDetail, dispatch, cart]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) >= 0)
      setQuantity(parseInt(event.currentTarget.value));
  };

  const handleUpdateCart = () => {
    if (!productDetail) return;

    if (!productInCart || quantity > productInCart?.quantity) {
      const updatedQuantity = productInCart
        ? quantity - productInCart.quantity
        : quantity;
      dispatch(
        addCartItemAsync({
          productId: productDetail!.id,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = productInCart.quantity - quantity;
      dispatch(
        removeCartItemAsync({
          productId: productDetail!.id,
          quantity: updatedQuantity,
        })
      );
    }
  };

  if (!productDetail || loading)
    return <LoadingComponent message="Loading Product...."></LoadingComponent>;
  return (
    <Container sx={{ marginTop: "10rem", marginBottom: "3rem" }}>
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
                <TableRow>
                  <TableCell>Inventory</TableCell>
                  <TableCell>{productDetail?.inventory}</TableCell>
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
                  productInCart?.quantity === quantity ||
                  (!productInCart && quantity === 0) ||
                  (!productInCart && quantity > productDetail.inventory)
                }
                sx={{ height: "55px" }}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                onClick={handleUpdateCart}
              >
                {productInCart ? "Update Quantity" : "Add to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
          {user?.role === "Admin" && (
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
                <Box
                  component={Link}
                  to={`/products/${productDetail.id}/update`}
                >
                  <LoadingButton
                    sx={{ height: "55px" }}
                    color="primary"
                    size="large"
                    variant="contained"
                    fullWidth
                  >
                    Update
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Reviews reviews={reviews} />
      <Marquee></Marquee>
    </Container>
  );
}

export default ProductDetails;
