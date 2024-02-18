import React from "react";
import { ProductType } from "../../types/type";
import styled from "@emotion/styled";
import LoadingComponent from "../loading/LoadingComponent";

type Props = {
  product: ProductType;
};

const ProductCard1 = styled("div")({
  backgroundColor: "#dcdcdc",
  borderRadius: "20px",
  width: "300px",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "scale(1, 1)",
  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "scale(1.1, 1.1)",
  },
  cursor: "pointer",
});

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
    <ProductCard1 className="product__card">
      <ProductFigure>
        <ProductImg
          src={
            product?.images[1]?.replace(/"/g, "") === undefined
              ? "https://source.unsplash.com/random/?clothing"
              : product?.images[1]?.replace(/"/g, "")
          }
          alt="product-img"
        />
        <ProductCaption>{product?.title}</ProductCaption>
        <ProductCaption>${product?.price}</ProductCaption>
      </ProductFigure>
    </ProductCard1>
  );
}

export default ProductCard;
