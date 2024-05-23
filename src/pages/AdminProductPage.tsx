import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Grid,
  Container,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import {
  deleteProduct,
  fetchFilterProduct,
} from "../redux/actions/productActions";
import NotFound from "../components/notFound/NotFound";

const ProductCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const ProductCardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

const AdminProductPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.user);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  useEffect(() => {
    if (!products.length) dispatch(fetchFilterProduct());
  }, [products]);

  const handleExpandClick = (ProductId: string) => {
    setExpandedProductId((prevId) => (prevId === ProductId ? null : ProductId));
  };
  if (user?.role === "User")
    return <NotFound message={"Only Admin Can Access This Page"} />;
  return (
    <Container sx={{ padding: "10rem" }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Grid container direction="column">
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductCardHeader>
              <Avatar
                alt={product.title}
                src={
                  product.images && product.images[0]
                    ? product.images[0].url
                    : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png`
                }
                sx={{ width: 64, height: 64, marginRight: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{product.title}</Typography>
              </CardContent>
              <Box display="flex">
                <Button
                  onClick={() => handleExpandClick(product.id.toString())}
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 1 }}
                >
                  View
                </Button>
                <Button
                  component={Link}
                  to={`/products/${product.id}/update`}
                  variant="contained"
                  color="secondary"
                  sx={{ marginRight: 1 }}
                >
                  Update
                </Button>
                <Button
                  onClick={() => dispatch(deleteProduct(product.id))}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </ProductCardHeader>
            <Collapse
              in={expandedProductId === product.id.toString()}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography paragraph>Title: {product.title}</Typography>
                <Typography paragraph>
                  Description: {product.description}
                </Typography>
                <Typography paragraph>Price: {product.price}</Typography>
              </CardContent>
            </Collapse>
          </ProductCard>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminProductPage;
