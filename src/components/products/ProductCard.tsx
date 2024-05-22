import { ProductType } from "../../types/type";
import styled from "@emotion/styled";
import LoadingComponent from "../loading/LoadingComponent";
import { Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";


type Props = {
  product: ProductType;
};

const ProductImg = styled("img")({
  height: "200px",
  width: "250px",
});

const ProductCaption = styled("figcaption")({
  paddingTop: "10px",
  textAlign: "center",
});



function ProductCard({ product }: Props) {
  const theme = useTheme();
  if (!product) return <LoadingComponent message="Product not found..." />;
  return (
    <Box component={Link} to={`/products/${product.id}`}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "20px",
          width: "300px",
          height: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "scale(1, 1)",
          transition: "transform 0.5s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.1, 1.1)",
          },
          textDecoration: "none",
          color: "black",
        }}
      >
        <ProductImg
          src={
            product.images && product.images[0]
              ? product.images[0].url
              : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png`
          }
          alt="product-img"
        />
      </Box>
      <ProductCaption>{product?.title}</ProductCaption>
      <ProductCaption>${product?.price}</ProductCaption>
    </Box>
  );
}

export default ProductCard;
