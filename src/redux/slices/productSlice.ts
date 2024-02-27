import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterType, ProductType } from "../../types/type";
import {
  createProduct,
  deleteProduct,
  fetchFilterProduct,
  fetchProductAsync,
  updateProduct,
} from "../actions/productActions";
import { toast } from "react-toastify";
import { router } from "../../router/Routes";

type InitialState = {
  products: ProductType[];
  productDetail: ProductType | null;
  loading: boolean;
  error?: string;
  productParams: FilterType;
};

const initialState: InitialState = {
  products: [],
  loading: false,
  productDetail: {
  id:0,
  title: "",
  price: 0,
  description: "",
  images: [],
  creationAt: "",
  updatedAt: "",
  category:null,
  },
  productParams: {
    price: 0,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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
    //--- FETCH PRODUCTS----
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

    //--- FETCH  SINGLE PRODUCT----
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

    //--- CREATE PRODUCT----
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
        toast.error("action.payload.message");
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });

    //--- UPDATE PRODUCT ----
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        const itemIndex = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products.splice(itemIndex, 1);
        toast.success("update the product successfully !!!");
        router.navigate(`/products/${action.payload.id}`);
        return {
          ...state,
          products: [...state.products, action.payload],
          productDetail: action.payload,
          loading: false,
        };
      }
    });

    builder.addCase(updateProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(updateProduct.rejected, (state, action:any) => {
       toast.error(action.payload.response.data.message[0]);
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };

    });

    // --- DELETE PRODUCT ----
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.meta.arg
      );
      toast.success("Delete product successfully");
      router.navigate("/");
    });

    builder.addCase(deleteProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        toast.error(action.payload.message);
      }
    });
  },
});

const productReducer = productSlice.reducer;

export const { setProductParams, resetProductParams } = productSlice.actions;

export default productReducer;
