import { useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { debounce } from "lodash";
import { setProductParams } from "../../redux/slices/productSlice";
import { grey} from "@mui/material/colors";

const MAX = 1000;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "0",
  },
  {
    value: MAX,
    label: "$1000",
  },
];
function valuetext(value: number) {
  return `${value}°C`;
}

function FilterForm() {
  const dispatch = useAppDispatch();
  const { productParams } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState(productParams.search);

  const handleSearchChange = debounce((event) => {
    dispatch(
      setProductParams({
        ...productParams,
        search: event.target.value as string,
      })
    );
  }, 1000);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"1rem"}
      paddingLeft={"3rem"}
      width={"80%"}
    >
      <Typography variant="h4" fontWeight={"700"}>
        Filter
      </Typography>
      <Stack spacing={4} sx={{ mb: 1 }}>
        <TextField
          placeholder="Search Product..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
            handleSearchChange(event);
          }}
          value={searchTerm || ""}
          variant="standard"
        />
      </Stack>

      <Stack spacing={2} sx={{ mb: 1 }}>
        <Typography fontWeight={"700"}>Price:</Typography>
        <Slider
          marks={marks}
          step={1}
          value={productParams.price}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          aria-label="Custom marks"
          min={MIN}
          max={MAX}
          onChange={(_, value) =>
            dispatch(setProductParams({ price: value as number }))
          }
        />
      </Stack>
      <Stack spacing={1} sx={{ mb: 1 }}>
        <Typography fontSize={"1.5rem"} fontWeight={"700"}>
          Categories
        </Typography>
        <RadioGroup
          aria-label="category"
          name="category"
          value={productParams.category || ""}
          onChange={(event) =>
            dispatch(
              setProductParams({
                ...productParams,
                category: event.target.value,
              })
            )
          }
        >
          <FormControlLabel
            value=""
            control={
              <Radio
                sx={{
                  color: grey[800],
                }}
              />
            }
            label="All"
          />
          <FormControlLabel
            value="1"
            control={
              <Radio
                sx={{
                  color: grey[800],
                }}
              />
            }
            label="Clothes"
          />
          <FormControlLabel
            value="2"
            control={
              <Radio
                sx={{
                  color: grey[800],
                }}
              />
            }
            label="Electronics"
          />
          <FormControlLabel
            value="3"
            control={
              <Radio
                sx={{
                  color: grey[800],
                }}
              />
            }
            label="Furniture"
          />
          <FormControlLabel
            value="4"
            control={
              <Radio
                sx={{
                  color: grey[800],
                }}
              />
            }
            label="Shoes"
          />
        </RadioGroup>
      </Stack>
    </Box>
  );
}

export default FilterForm;
