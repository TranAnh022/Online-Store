import { ChangeEvent, useEffect, useState } from "react";
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
import { fetchProductAsync } from "../redux/actions/productActions";
import LoadingComponent from "../components/loading/LoadingComponent";
import { addToCart, updateToCart } from "../redux/slices/cartSlice";
import { LoadingButton } from "@mui/lab";
import { CartItem } from "../types/type";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector((state) => state.products);
  const { cart } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(0);
  const product = cart?.products.find((p) => p.id === productDetail?.id);

  useEffect(() => {
    if (product && id && parseInt(id)=== productDetail?.id ) setQuantity(product.quantity);
    if (id && parseInt(id) !== productDetail?.id)
      dispatch(fetchProductAsync(parseInt(id)));
    console.log(id);
  }, [id, product, productDetail, dispatch]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  }

  function handleUpdateCart() {
    if (!product || product.quantity === undefined) {
      dispatch(addToCart({ ...productDetail, quantity } as CartItem));
    }
    if (product && product.quantity !== quantity) {
      dispatch(updateToCart({ id: product.id, quantity: quantity }));
    }
    
  }
  if (!productDetail) return <LoadingComponent message="Loading Product ..." />;
  return (
    <Container sx={{ marginTop: "5rem", marginBottom: "3rem" }}>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <img
            src={productDetail.images[1]}
            alt={productDetail.title}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h3">{productDetail.title}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${productDetail.price}
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
                  <TableCell>{productDetail.category.name}</TableCell>
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
                sx={{
                  height: "55px",
                }}
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;
