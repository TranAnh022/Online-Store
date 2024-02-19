import { useState } from "react";
import {
  Grid,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { debounce } from "lodash";
import { setProductParams } from "../../redux/slices/productSlice";

type Props = {};

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

function FilterForm() {
  const dispatch = useAppDispatch();
  const { productParams } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState(productParams.search);

  const handleSearchChange = debounce((event: any) => {
    dispatch(
      setProductParams({
        ...productParams,
        search: event.target.value as string,
      })
    );
  }, 1000);

  return (
    <Grid container alignItems="center">
      <Grid item md={4}>
        <TextField
          placeholder="Search..."
          onChange={(event: any) => {
            setSearchTerm(event.target.value);
            handleSearchChange(event);
          }}
          value={searchTerm || ""}
        />
      </Grid>
      <Grid item md={6}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Typography>Price:</Typography>
          <Slider
            marks={marks}
            step={1}
            value={productParams.price}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            onChange={(_, value) =>
              dispatch(setProductParams({ price: value as number }))
            }
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Typography>Category:</Typography>
          <Select
            value={productParams.category}
            onChange={(event) =>
              dispatch(
                setProductParams({
                  ...productParams,
                  category: event.target.value,
                })
              )
            }
            label="Categories"
          >
            <MenuItem >None</MenuItem>
            <MenuItem value="1">Clothes</MenuItem>
            <MenuItem value="2">Electronics</MenuItem>
            <MenuItem value="3">Furniture</MenuItem>
            <MenuItem value="4">Shoes</MenuItem>
          </Select>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default FilterForm;
