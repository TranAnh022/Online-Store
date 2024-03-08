import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { ProductDto, ProductType } from "../../types/type";

export const mockProducts = [
  {
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
  },
  {
    id: 66,
    title: "tws",
    price: 10,
    description: "sf",
    images: ['["https://www.gstatic.com/webp/gallery3/1.sm.png"]'],
    creationAt: "2024-02-29T06:51:22.000Z",
    updatedAt: "2024-02-29T09:09:14.000Z",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2024-02-29T03:37:26.000Z",
      updatedAt: "2024-02-29T03:37:26.000Z",
    },
  },
  {
    id: 72,
    title: "hi",
    price: 40,
    description:
      "Step into the spotlight with these eye-catching rainbow glitter high heels. Designed to dazzle, each shoe boasts a kaleidoscope of shimmering colors that catch and reflect light with every step. Perfect for special occasions or a night out, these stunners are sure to turn heads and elevate any ensemble.",
    images: ['["https://placeimg.com/640/480/any"]'],
    creationAt: "2024-02-29T07:01:13.000Z",
    updatedAt: "2024-02-29T07:01:13.000Z",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2024-02-29T03:37:26.000Z",
      updatedAt: "2024-02-29T03:37:26.000Z",
    },
  },
];

export const handler = [
  
  http.get("https://api.escuelajs.co/api/v1/products", () => {
    return HttpResponse.json(mockProducts, { status: 200 });
  }),

  http.post("https://api.escuelajs.co/api/v1/products", async ({ request }) => {
    const product = (await request.json()) as ProductDto;
    const createdProduct: ProductType = {
      ...product,
      id: 4,
      category: {
        id: 2,
        name: "Electronics",
        image: "https://i.imgur.com/ZANVnHE.jpeg",
        creationAt: "2024-02-29T03:37:26.000Z",
        updatedAt: "2024-02-29T03:37:26.000Z",
      },
      creationAt: "2024-02-29T16:49:29.000Z",
      updatedAt: "2024-02-29T16:49:29.000Z",
    };
    const updateMockTest = [...mockProducts, createdProduct];
    return HttpResponse.json(updateMockTest, { status: 201 });
  }),

  http.get(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ params }) => {
      const id = Number(params.id);
      const product = mockProducts.find((item) => item.id === id);
      return HttpResponse.json(product, { status: 200 });
    }
  ),

  http.put("https://api.escuelajs.co/api/v1/products/:id", async () => {
    const product = { ...mockProducts[0], title: "updated Test" };
    return HttpResponse.json(product, { status: 200 });
  }),

  http.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ params }) => {
      const id = Number(params.id);
      const product = mockProducts.filter((item) => item.id !== id);
      if (!product) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json(true, { status: 200 });
    }
  ),
];

export const productServer = setupServer(...handler);
