import {
    Box,
    Card,
    IconButton,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import React from "react";
import type { FC } from "react";
import {
    Edit,
    Delete
} from "react-feather";
import { Link as RouterLink } from "react-router-dom";

interface IEmployeeTable {
    employees: Employee.Infor[];
    setDeleteEmployeeModal: (employeeId: string) => void;
}

const EmployeeTable: FC<IEmployeeTable> = ({
    employees,
    setDeleteEmployeeModal
}) => {
    return (
        <Card>
            <Box minWidth={700}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Firstname
                            </TableCell>
                            <TableCell>
                                Lastname
                            </TableCell>
                            <TableCell>
                                Email Address
                            </TableCell>
                            <TableCell>
                                Phone Number
                            </TableCell>
                            <TableCell>
                                Gender
                            </TableCell>
                            <TableCell align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow
                                hover
                                key={employee.id}
                            >
                                <TableCell>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="inherit"
                                        >
                                            {employee.firstname}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="inherit"
                                        >
                                            {employee.lastname}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="inherit"
                                        >
                                            {employee.emailAddress}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="inherit"
                                        >
                                            {employee.phoneNumber}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="inherit"
                                        >
                                            {employee.gender}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        component={RouterLink}
                                        to={`/employee/edit/${employee.id}`}
                                    >
                                        <SvgIcon fontSize="small">
                                            <Edit />
                                        </SvgIcon>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setDeleteEmployeeModal(employee.id)}
                                    >
                                        <SvgIcon fontSize="small">
                                            <Delete />
                                        </SvgIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
};

export default EmployeeTable;
