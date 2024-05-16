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
import {
  addToCart,
  removeToCart,
  updateToCart,
} from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../redux/configureStore";
import { formattingURL } from "../../utils";

type Props = { cart: CartType };

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
            <TableCell align="right">SubTotal</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((item: CartItem) => (
            <TableRow key={item.title}>
              <TableCell component="th" scope="row">
                <Box
                  display="flex"
                  alignItems="center"
                  component={Link}
                  to={`/products/${item.id}`}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  {item.images && (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      style={{ height: 50, marginRight: 20 }}
                    />
                  )}
                  <span>{item.title}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${item.price}</TableCell>
              <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <LoadingButton
                    onClick={() =>
                      dispatch(
                        updateToCart({
                          id: item.id,
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
                    onClick={() => dispatch(addToCart(item))}
                    color="error"
                  >
                    <Add />
                  </LoadingButton>
                </Box>
              </TableCell>
              <TableCell align="right">{item.price * item.quantity}</TableCell>
              <TableCell align="right">
                <LoadingButton
                  onClick={() => dispatch(removeToCart(item.id))}
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
