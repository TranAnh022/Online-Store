import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  categoryId: yup.string().required("Category is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: yup.string().required("Description is required"),
  images: yup.array().of(yup.string()).optional(),
});
