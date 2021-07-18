import { combineReducers } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import { reducer as employeeReducer } from "src/store/slices/employee/employee.slice";

const rootReducer = combineReducers({
  form: formReducer,
  employees: employeeReducer,
});

export default rootReducer;
