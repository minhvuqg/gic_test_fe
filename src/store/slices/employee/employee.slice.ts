import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import type { AppThunk } from "src/store";
import axios from "src/utils/axios";
import { validatorDto } from "src/utils/validatorDto";
import { EmployeeDTO } from "src/DTO/employee.dto";

interface EmployeeState {
    employees: Employee.Infor[] | null;
    currentEmployee: Employee.Infor | null;
    selectedEmployeeId: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    currentEmployee: null,
    selectedEmployeeId: null,
};

const slice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        getEmployees(state: EmployeeState, action: PayloadAction<{ employees: Employee.Infor[]; }>) {
            const { employees } = action.payload;

            state.employees = employees;
        },

        setCurrentEmployee(state: EmployeeState, action: PayloadAction<{ employee: Employee.Infor; } | null>) {
            if (!!action.payload) {
                const { employee } = action.payload;
                state.currentEmployee = employee;
                return;
            }
            state.currentEmployee = null;
        },

        setSelectedEmployeeId(state: EmployeeState, action: PayloadAction<{ employeeId: string; }>) {
            const { employeeId } = action.payload;

            state.selectedEmployeeId = employeeId
        },

        addEmployee(state: EmployeeState, action: PayloadAction<{ employee: Employee.Infor; }>) {
            const { employee } = action.payload;

            state.employees = [...state.employees, employee];
        },

        updateEmployee(state: EmployeeState, action: PayloadAction<{ employee: Employee.Infor; }>) {
            const { employee } = action.payload;

            state.employees = _.map(state.employees, (_employee) => {
                if (_employee.id === employee.id) {
                    return employee;
                }
                return _employee;
            });
        },

        deleteEmployee(state: EmployeeState, action: PayloadAction<{ employeeId: string; }>) {
            const { employeeId } = action.payload;

            state.employees = _.reject(state.employees, { id: employeeId });
        },
    },
});

export const { reducer, actions, name } = slice;

export const getEmployees = (): AppThunk => async (dispatch) => {
    const response = await axios.get<{ employees: Employee.Infor[]; }>("/employees");
    dispatch(slice.actions.getEmployees(response.data));
};

export const setCurrentEmployee = (employeeId: string | null): AppThunk => async (dispatch) => {
    if (!!employeeId) {
        const response = await axios.get<{ employee: Employee.Infor; }>("/employee", {
            params: {
                employeeId,
            },
        });
        await validatorDto(EmployeeDTO, response.data.employee);
        dispatch(slice.actions.setCurrentEmployee(response.data));
    }
    else {
        dispatch(slice.actions.setCurrentEmployee(null));
    }
};

export const setSelectedEmployeeId = (employeeId: string): AppThunk => async (dispatch) => {
    dispatch(slice.actions.setSelectedEmployeeId({ employeeId }));
};

export const addEmployee = (data: Employee.PayloadSubmit): AppThunk => async (dispatch) => {
    const response = await axios.post<{ employee: Employee.Infor; }>("/employees/add", data);

    dispatch(slice.actions.addEmployee(response.data));
};

export const updateEmployee = (employeeId: string, update: Employee.PayloadSubmit): AppThunk => async (dispatch) => {
    const response = await axios.put<{ employee: Employee.Infor; }>("/employees/update", {
        employeeId,
        update,
    });

    dispatch(slice.actions.updateEmployee(response.data));
};

export const deleteEmployee = (employeeId: string): AppThunk => async (dispatch) => {
    await axios.post("/employees/remove", {
        employeeId,
    });

    dispatch(slice.actions.deleteEmployee({ employeeId }));
};

export default slice;
