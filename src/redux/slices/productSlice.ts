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
    id: 0,
    title: "",
    price: 0,
    description: "",
    images: [],
    creationAt: "",
    updatedAt: "",
    category: null,
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

    builder.addCase(fetchFilterProduct.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    });
    builder.addCase(fetchFilterProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchFilterProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
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
        toast.success("create new product successfully !!!")
        router.navigate(`/products/${action.payload.id}`)
        return {
          ...state,
          products: [...state.products, action.payload],
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


   builder.addCase(updateProduct.fulfilled, (state, action) => {
     if (!(action.payload instanceof Error)) {
       const updatedProduct = action.payload;
       const itemIndex = state.products.findIndex(
         (product) => product.id === updatedProduct.id
       );
       if (itemIndex !== -1) {
         state.products.splice(itemIndex, 1, updatedProduct);
         state.productDetail = updatedProduct;
         state.loading = false;
         toast.success("Product updated successfully !!!");
         router.navigate(`/products/${updatedProduct.id}`);
       }
     }
   });

    builder.addCase(updateProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(updateProduct.rejected, (state, action: any) => {
      toast.error(action.payload.message);
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    });

  
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      toast.success("Delete product successfully");
      router.navigate("/");
      const newProducts = state.products.filter(
        (product) => product.id !== action.meta.arg
      );
      return {
        ...state,
        products: newProducts,
        loading: false,
      };
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
