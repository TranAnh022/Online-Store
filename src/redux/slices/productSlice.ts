import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterType, ProductType } from "../../types/type";
import { createProduct, fetchAllProductsAsync, fetchFilterProduct, fetchProductAsync } from "../actions/productActions";


type InitialState = {
  products: ProductType[];
  favList: ProductType[];
  productDetail: ProductType | null;
  loading: boolean;
  error?: string;
  productParams: FilterType;
};

const initialState: InitialState = {
  products: [],
  loading: false,
  favList: [],
  productDetail: null,
  productParams: {
    price: 0,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // add to fav list
    addToFav: (state, action: PayloadAction<ProductType>) => {
      // state: {products, favList}
      // logic
      // write logic to not allow user to add same product tp fav list
      state.favList.push(action.payload);
    },
    setProductParams: (state, action: PayloadAction<FilterType>) => {
      state.productParams = {
        ...state.productParams,
        ...action.payload,
      };
    },
    resetProductParams: (state) => {
      state.productParams = {
        search: "",
        price: 0,
        category: "",
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });

    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(fetchFilterProduct.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(fetchFilterProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchFilterProduct.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          productDetail: action.payload,
          loading: false,
        };
      }
    });

    builder.addCase(fetchProductAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        const newProducts = [...state.products, action.payload];
        return {
          ...state,
          products: newProducts,
          loading: false,
        };
      }
    });

    builder.addCase(createProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(createProduct.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

const productReducer = productSlice.reducer;

export const { addToFav, setProductParams, resetProductParams } =
  productSlice.actions;

export default productReducer;
