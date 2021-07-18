import TextField from "src/components/TextInput"
import React from "react";

const EmployeeTextField = ({
  input,
  label,
  meta: { touched, invalid, error },
  ...rest
}) => {
  return (
    <TextField
      id={input.name}
      label={label}
      textHint={touched && error}
      error={touched && invalid}
      placeholder={`Enter Your ${label}...`}
      // variant="outlined"
      {...input}
      {...rest}
    />
  );
};

export default EmployeeTextField;
