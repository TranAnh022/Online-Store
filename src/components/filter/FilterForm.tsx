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
  return `${value}`;
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
            value="50e3ad7f-f268-4c03-a632-05b0c2a03245"
            control={
              <Radio
                sx={{
                  color: grey[800],
                }}
              />
            }
            label="Home Goods"
          />
          <FormControlLabel
            value="91c88378-e3fd-4d73-8b19-9580cebbaab7"
            control={
              <Radio
                sx={{
                  color: grey[800],
                }}
              />
            }
            label="Toys"
          />
          <FormControlLabel
            value="c517d50f-b81f-4bc6-90a0-25dc149338a0"
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
            value="f2cf5c47-e213-49a7-9a71-52a3bbb7c9eb"
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
