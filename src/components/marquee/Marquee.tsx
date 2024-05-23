import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useAppSelector } from "../../redux/configureStore";
import { Link } from "react-router-dom";

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Track = styled(Box)`
  display: flex;
  position: absolute;
  will-change: transform;
  animation: ${marquee} 15s linear infinite;
  width: 180%;
  &:hover {
    animation-play-state: paused;
  }
`;

const MarqueeContainer = styled(Box)`
  position: relative;
  height: 400px;
  width: 100%;
  overflow-x: hidden;
`;

const MarqueeWrapper = styled(Box)`
  margin-top: 120px;
`;

const ProductCard = styled(Card)`
  width: 200px;
  margin: 1rem;
  transition: transform 0.5s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const ProductImage = styled(CardMedia)`
  border-radius: 15px;
  background-color: #ebebeb;
  transition: transform 0.5s ease;
  height: 140px;
`;

const Marquee = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <Box className="maylike-products-wrapper">
      <h2>You may also like</h2>
      <div className="marquee">
        <div className="maylike-products-container track">
          {products.map((item) => (
            <div>
              <Link to={`/products/${item.id}`}>
                <div className="product-card">
                  <img
                    src={
                      item.images && item.images[0]
                        ? item.images[0].url
                        : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png`
                    }
                    alt="product-image"
                    width={250}
                    height={250}
                    className="product-image"
                  />
                  <p className="product-name">{item.title}</p>
                  <p className="prodcuct-price">${item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Marquee;
