import { useSelector } from "react-redux";
import {
  AppState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/configureStore";
import { useEffect, useState } from "react";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { ProductType } from "../../types/type";
import ProductCard from "./ProductCard";
import { ProductContainer } from "../../customizedCSS";
import FilterForm from "../filter/FilterForm";
import { fetchFilterProduct } from "../../redux/actions/productActions";
import NotFound from "../notFound/NotFound";

function Products() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [productsShow, setProductsShow] = useState<ProductType[]>([]);
  const { productParams } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFilterProduct(productParams));
  }, [dispatch, productParams]);

  const productList = useSelector((state: AppState) => state.products.products);
  const totalPage = Math.ceil(productList.length / 6);

  useEffect(() => {
    const paginationProducts = async () => {
      const startIndex = (page - 1) * 6;
      const endIndex = startIndex + 6;
      setProductsShow(productList.slice(startIndex, endIndex));
    };
    paginationProducts();
  }, [page, productList]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  if (!productsShow) return <NotFound />;

  return (
    <Box
      sx={{
       
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <Box sx={{padding:"30px"}}>
        <Typography variant="h2" fontWeight={700} textAlign={"center"}>
          Products
        </Typography>
        <Typography textAlign={"center"} variant="subtitle2">
          Fashion of many variations
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={3}>
          <FilterForm />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={ProductContainer}>
            {productsShow.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </Box>
          {productParams && (
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChange}
              sx={{ margin: "4rem 0 4rem" }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Products;
