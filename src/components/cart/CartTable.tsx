import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Add, Delete, Remove } from "@mui/icons-material";
import { CartItem, CartType } from "../../types/type";
import { useAppDispatch } from "../../redux/configureStore";
import {
  addCartItemAsync,
  removeCartItemAsync,
} from "../../redux/actions/cartAction";

type Props = { cart: CartType | null };

function CartTable({ cart }: Props) {
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.items.map((item: CartItem, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Box
                  display="flex"
                  alignItems="center"
                  component={Link}
                  to={`/products/${item.product.id}`}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  {item.product.images && (
                    <img
                      src={item.product?.images[0]?.url}
                      alt={item.product.title}
                      style={{ height: 50, marginRight: 20 }}
                    />
                  )}
                  <span>{item.product.title}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${item.product.price}</TableCell>
              <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <LoadingButton
                    onClick={() =>
                      dispatch(
                        removeCartItemAsync({
                          productId: item.product.id,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  <span>{item.quantity}</span>
                  <LoadingButton
                    onClick={() =>
                      dispatch(
                        addCartItemAsync({
                          productId: item.product.id,
                          quantity: 1,
                        })
                      )
                    }
                    color="error"
                  >
                    <Add />
                  </LoadingButton>
                </Box>
              </TableCell>
              <TableCell align="right">
                {(item.product.price * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <LoadingButton
                  onClick={() =>
                    dispatch(
                      removeCartItemAsync({
                        productId: item.product.id,
                        quantity: item.quantity,
                        name: "del",
                      })
                    )
                  }
                  color="error"
                >
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable;
