import {
  createProduct,
  deleteProduct,
  fetchFilterProduct,
  fetchProductAsync,
  updateProduct,
} from "../redux/actions/productActions";
import { createNewStore } from "../redux/configureStore";
import { productServer } from "./shared/productServer";
import { ProductDto } from "../types/type";

let store = createNewStore();

beforeAll(() => productServer.listen());

afterAll(() => {
  productServer.close();
});

beforeEach(() => {
  store = createNewStore();
});

describe("product reducer", () => {

  test("should fetch all products from api", async () => {
    await store.dispatch(fetchFilterProduct());
    expect(store.getState().products.products.length).toBe(3);
    expect(store.getState().products.loading).toBeFalsy();
  });


  test("create a new product", async () => {
    const product: ProductDto = {
      title: "new test",
      price: 20,
      description: "new test",
      images: ["test.png"],
      categoryId: 1,
      inventory:2
    };
    await store.dispatch(createProduct(product));
    expect(store.getState().products.products.length).toBe(1);
  });


  test("Get product by id", async () => {
    const productId: number = 64;
    await store.dispatch(fetchProductAsync(productId));
    expect(store.getState().products.productDetail).toEqual({
      id: 64,
      title: "Shoes",
      price: 45,
      description: "comfortable shoes",
      images: ['["https://placeimg.com/640/480/any"]'],
      creationAt: "2024-02-29T06:39:33.000Z",
      updatedAt: "2024-02-29T09:47:15.000Z",
      category: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-02-29T03:37:26.000Z",
        updatedAt: "2024-02-29T03:37:26.000Z",
      },
    });
    expect(store.getState().products.loading).toBeFalsy();
  });


  test("update product by id", async () => {
    const updatedProduct = {
      id: 64,
      value: {
        title: "updated Test",
        price: 45,
        description: "comfortable shoes",
        images: ['["https://placeimg.com/640/480/any"]'],
        categoryId: 1,
        inventory:3
      },
    };
    await store.dispatch(updateProduct(updatedProduct));

    expect(store.getState().products.productDetail).toEqual({
      id: 64,
      title: "updated Test",
      price: 45,
      description: "comfortable shoes",
      images: ['["https://placeimg.com/640/480/any"]'],
      creationAt: "2024-02-29T06:39:33.000Z",
      updatedAt: "2024-02-29T09:47:15.000Z",
      category: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-02-29T03:37:26.000Z",
        updatedAt: "2024-02-29T03:37:26.000Z",
      },
    });
    expect(store.getState().products.loading).toBeFalsy();
  });



  test("delete product by id", async () => {
    await store.dispatch(deleteProduct(64));
    expect(store.getState().products.loading).toBeFalsy();
  });
});
