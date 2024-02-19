import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilterType, ProductType } from "../../types/type";
import agent from "../../api/agent";

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

export const fetchAllProductsAsync = createAsyncThunk<ProductType[]>(
  "fetchAllProductsAsync",
  async () => {
    try {
      const data = await agent.Product.list();
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const fetchProductAsync = createAsyncThunk<ProductType, string>(
  "fetchProductAsync",
  async (productId) => {
    try {
      
      const data = await agent.Product.details(productId);
      console.log(data)
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const fetchFilterProduct = createAsyncThunk(
  "fetchFilterProductsAsync",
  async (filterMethod: FilterType) => {
    try {
      const data = await agent.Product.filter(filterMethod);
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

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
    // async
    // 3 states:
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      // save data in redux
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    // loading
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // error
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        //logic
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(fetchFilterProduct.fulfilled, (state, action) => {
      // save data in redux
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    // loading
    builder.addCase(fetchFilterProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // error
    builder.addCase(fetchFilterProduct.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        //logic
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      // save data in redux
      if (!(action.payload instanceof Error)) {

        return {
          ...state,
          productDetail: action.payload,
          loading: false,
        };
      }
    });
    // loading
    builder.addCase(fetchProductAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // error
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        //logic
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
// actions: use in component:
export default productReducer;
