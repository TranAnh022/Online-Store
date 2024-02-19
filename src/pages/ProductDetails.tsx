import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";

import { fetchProductAsync } from "../redux/slices/productSlice";
import {
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

type Props = {};

function ProductDetails({}: Props) {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector((state) => state.products);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchProductAsync(id as string));
  }, [dispatch, id]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  }
  //          function handleUpdateCart() {
  //     if (!item || quantity > item.quantity) {
  //       const updatedQuantity = item ? quantity - item.quantity : quantity;
  //       dispatch(
  //         addBasketItemAsync({
  //           productId: product!.id,
  //           quantity: updatedQuantity,
  //         })
  //       );
  //     } else {
  //       const updatedQuantity = item.quantity - quantity;
  //       dispatch(
  //         removeBasketItemAsync({
  //           productId: product!.id,
  //           quantity: updatedQuantity,
  //         })
  //       );
  //     }
  //   }
  if (!id || !productDetail) return <div></div>;
  return (
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
          ${(productDetail.price / 100).toFixed(2)}
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
            {/* <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              sx={{
                height: "55px",
              }}
              loading={status.includes("pending")}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateCart}
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
