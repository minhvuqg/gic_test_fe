
import * as Yup from "yup";
import { GENDER_OPTIONS } from "src/constants/employee";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().min(6, "Must be at least 6 characters").max(10, "Must be at most 10 characters").required("Required"),
  lastname: Yup.string().min(6, "Must be at least 6 characters").max(10, "Must be at most 10 characters").required("Required"),
  phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(
          /\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}/g,
          "Invalid SG(+65) phone number"
      ),
  emailAddress: Yup.string().email().required("Email is required"),
  gender: Yup.string().oneOf(GENDER_OPTIONS)
});

/**
 * Validating the object data from form
 * 
 * @param employee the employee object
 * @returns 
 */
export const formValidate = (employee: Employee.Infor) => {
  const formErrors = {};

  try {
      validationSchema.validateSync(employee, { abortEarly: false });
  } catch (errors) {
      errors.inner.forEach((error: any) => {
        formErrors[error.path] = error.message;
      });
  }

  return formErrors;
};