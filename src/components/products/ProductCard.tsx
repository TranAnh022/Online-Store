import { ProductType } from "../../types/type";
import styled from "@emotion/styled";
import LoadingComponent from "../loading/LoadingComponent";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { FormattingURL } from "../../utils";

type Props = {
  product: ProductType;
};

const ProductCard1 = {
  backgroundColor: "#dcdcdc",
  borderRadius: "20px",
  width: "300px",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "scale(1, 1)",
  transition: "transform 0.5s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1, 1.1)",
  },
  textDecoration: "none",
  color: "black",
};

const ProductFigure = styled("figure")({
  padding: "0",
  margin: "0",
});

const ProductImg = styled("img")({
  height: "200px",
  width: "250px",
});

const ProductCaption = styled("figcaption")({
  paddingTop: "10px",
});

function ProductCard({ product }: Props) {
  if (!product) return <LoadingComponent message="Product not found..." />;
  return (
    <Box
      className="product__card"
      sx={ProductCard1}
      component={Link}
      to={`/products/${product.id}`}
    >
      <ProductFigure>
        <ProductImg
          src={
            !FormattingURL(product.images![0])
              ? "https://source.unsplash.com/random/?clothing"
              : FormattingURL(product.images![0])
          }
          alt="product-img"
        />
        <ProductCaption>{product?.title}</ProductCaption>
        <ProductCaption>${product?.price}</ProductCaption>
      </ProductFigure>
    </Box>
  );
}

export default ProductCard;
