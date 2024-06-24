import { EMAIL_REGEX } from "./constants";
import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().required().matches(EMAIL_REGEX, "must be a valid email"),
  password: yup.string().required().min(8, "must be 8 character"),
});
export const addValidation = yup.object({
  title: yup.string().required("title is required."),
});
export const editValidation = yup.object({
  title: yup.string().required("title is required."),
});
