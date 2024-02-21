import axios, { AxiosResponse } from "axios";
import { FilterType, ProductDto, UserLogin, UserType } from "../types/type";
import { store } from "../redux/configureStore";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1/";


const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Assuming your token is stored in the user slice of your Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Product = {
  list: () => requests.get("products"),
  filter: (filterParams: FilterType) => {
    let url = "products";

    const queryParams: string[] = [];

    if (filterParams.category?.length) {
      queryParams.push(`categoryId=${filterParams.category}`);
    }

    if (filterParams.price > 0) {
      queryParams.push(
        `price_min=${filterParams.price.toString()}&price_max=1000`
      );
    }

    if (filterParams.search?.length) {
      queryParams.push(`title=${filterParams.search}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    return requests.get(url);
  },
  details: (id: string) => requests.get(`products/${id}`),
  create: (values: ProductDto) => requests.post(`products`, values),
};

const User = {
  login: (values: UserLogin) => requests.post("auth/login", values),
  register: (values: UserType) => requests.post(`users/${values.id}`, values),
  currentUser: () => requests.get("auth/profile"),
};

const agent = {
  Product,
  User,
};

export default agent;
