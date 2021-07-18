import React, {
    useCallback,
    useEffect,
    FC
} from "react";
import {
    Box,
    Container,
    makeStyles,
    CircularProgress
} from "@material-ui/core";
import {
    useParams,
} from "react-router-dom";
import Page from "src/components/Page";
import Form from "src/components/Employee/EmployeeForm";
import {
    updateEmployee,
    setCurrentEmployee
} from "src/store/slices/employee/employee.slice";
import { useDispatch, useSelector } from "src/store";
import { useHistory } from "react-router-dom";
import EmployeeHeader from "src/components/Employee/EmployeeHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

const EmployeeEdit: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id: employeeId } = useParams<Employee.EditParams>();
    const { currentEmployee } = useSelector((state) => state.employees);

    useEffect(() => {
        return () => dispatch(setCurrentEmployee(null))
    }, [employeeId, dispatch])

    useEffect(() => {
        dispatch(setCurrentEmployee(employeeId))
    }, [employeeId, dispatch])

    const handleEditEmployee = useCallback(async (values: Employee.PayloadSubmit) => {
        dispatch(updateEmployee(employeeId, values))
        history.push("/employee/list")
    }, [dispatch, history, employeeId])

    if (!currentEmployee) {
        return <CircularProgress />
    }

    return (
        <Page
            className={classes.root}
            title="Employee Edit"
        >
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Container>
                        <EmployeeHeader label={"Edit employe"} />
                        <Form onSubmit={handleEditEmployee} initialValues={currentEmployee} />
                    </Container>
                </Box>
            </Container>
        </Page>
    );
};

export default EmployeeEdit;