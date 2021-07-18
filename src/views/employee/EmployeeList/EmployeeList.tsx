import {
  Box,
  Container,
  makeStyles,
  Grid,
  Button
} from "@material-ui/core";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Page from "src/components/Page";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import EmployeeTable from "src/components/Employee/EmployeeTable";
import LoadingIndicator from "src/components/LoadingIndicator";
import Modal from "src/components/Modal";
import {
  getEmployees,
  deleteEmployee,
  setSelectedEmployeeId
} from "src/store/slices/employee/employee.slice";
import { useDispatch, useSelector } from "src/store";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  action: {
    "marginBottom": theme.spacing(1),
    "& + &": {
      marginLeft: theme.spacing(1),
    },
  },
}));

const EmployeeList: FC = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { selectedEmployeeId } = useSelector((state) => state.employees);

  const setDeleteEmployeeModal = (employeeId: string) => {
    dispatch(setSelectedEmployeeId(employeeId))
    setDeleteModal(true)
  }

  const closeDeleteConfirmationModal = () => {
    setDeleteModal(false)
  }

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true)
      if (!!dispatch && isMountedRef.current) {
        dispatch(getEmployees())
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }, [isMountedRef, dispatch]);

  const removeEmployee = useCallback(async () => {
    try {
      setLoadingDelete(true)
      if (!!dispatch) {
        dispatch(deleteEmployee(selectedEmployeeId))
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      setDeleteModal(false)
      setLoadingDelete(false);
    }
  }, [dispatch, selectedEmployeeId]);


  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  return (
    <Page
      className={classes.root}
      title="Summary Page"
    >
      <Modal visible={deleteModal} setIsVisible={setDeleteModal}>
        <h2>
          Delete Employee?
        </h2>
        <div>
          <Button
            onClick={removeEmployee}
            disabled={loadingDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={closeDeleteConfirmationModal}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Container maxWidth={false}>
        <Grid
          container
          justify={"flex-end"}
        >
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              className={classes.action}
              component={Link}
              to="/employee/add"
            >
              Add Employee
            </Button>
          </Grid>
        </Grid>
        {employees && employees.length > 0 && !loading && <Box mt={3}>
          <EmployeeTable
            setDeleteEmployeeModal={setDeleteEmployeeModal}
            employees={employees} />
        </Box>}
        {(!employees || employees.length === 0) &&
          <p>
            No employees
          </p>
        }
        {(loading || loadingDelete) &&
          <LoadingIndicator />
        }
      </Container>
    </Page>
  );
};

export default EmployeeList;
