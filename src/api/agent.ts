import axios, { AxiosResponse } from "axios";
import { FilterType } from "../types/type";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Product = {
  list: () => requests.get("products"),
  filter: (filterParams: FilterType) => {
    if (filterParams.category?.length)
      return requests.get(`products/?categoryId=${filterParams.category}`);
    if (filterParams.price > 0)
      return requests.get(
        `products/?price_min=${filterParams.price.toString()}&price_max=1000`
      );
    if (filterParams.search?.length)
      return requests.get(`products/?title=${filterParams.search}`);
    return requests.get("products");
  },
  details: (id: string) => requests.get(`products/${id}`),
};

const agent = {
  Product,
};

export default agent;
