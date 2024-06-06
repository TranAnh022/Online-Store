import * as yup from "yup";

export const validationProductSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  categoryId: yup.string().required("Category is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  inventory: yup
    .number()
    .required("Inventory is required")
    .positive("Inventory must be positive"),
  description: yup.string().required("Description is required"),
  images: yup.array().of(yup.string()).optional(),
});

export const validationUserSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const validationRegisterSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  avatar: yup.string().required("Avatar is required"),
});

export const validationUserUpdateSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  avatar: yup.string().url("Invalid URL").required("Avatar URL is required"),
});
