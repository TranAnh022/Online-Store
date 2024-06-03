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


const Marquee = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <Box className="maylike-products-wrapper">
      <h2>You may also like</h2>
      <div className="marquee">
        <div className="maylike-products-container track">
          {products.map((item,index) => (
            <div key={index}>
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
