import { Container, makeStyles } from "@material-ui/core";
import React, { useCallback, FC } from "react";
import Page from "src/components/Page";
import Form from "src/components/Employee/EmployeeForm"
import {
  addEmployee,
} from "src/store/slices/employee/employee.slice";
import { useDispatch } from "src/store";
import { useHistory } from "react-router-dom";
import EmployeeHeader from "src/components/Employee/EmployeeHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: 100,
  },
}));

const EmployeeAdd: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddEmployee = useCallback(async (values) => {
    dispatch(addEmployee(values))
    history.push("/employee/list")
  }, [dispatch, history])

  return (
    <Page
      className={classes.root}
      title="Employee Add"
    >
      <Container maxWidth="lg">
        <EmployeeHeader label={"Add employee"} />
        <Form onSubmit={handleAddEmployee} />
      </Container>
    </Page>
  );
};

export default EmployeeAdd;
