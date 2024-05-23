import { Box, Grid, Link, Typography } from "@mui/material";

import { CartItem, OrderItem } from "../../types/type";
import { useAppSelector } from "../../redux/configureStore";

const ProductOrder = ({ item }: { item: OrderItem }) => {
  const { products } = useAppSelector((state) => state.products);
  const product = products.find((product) => product.id === item.productSnapshot.productId)
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        {product && (
          <img
            src={
              product.images === null
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
                : product.images[0].url
            }
            alt={item.productSnapshot.title}
            style={{ width: "100%" }}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">{item.productSnapshot.title}</Typography>
        <Typography variant="body2" color="error">
          Only {product && product.inventory} left in stock.
        </Typography>
        <Typography variant="body2">
          Sent from: <Link href="#">Online-Store</Link>
        </Typography>
        <Typography variant="body2">
          <strong>Style Name:</strong> Single
        </Typography>
        <Typography variant="body2">
          Price: $ {item.price}
        </Typography>
        <Typography variant="body2">Quantity: {item.quantity}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProductOrder;
