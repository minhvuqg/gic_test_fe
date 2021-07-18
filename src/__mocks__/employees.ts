import _ from "lodash";
import faker from 'faker';
import mock from "src/utils/mock";
import { GENDER_OPTIONS } from "src/constants/employee";

const { name, random, phone } = faker;

let employees: Employee.Infor[] = ["1", "2", "3"].map((id) => ({
    id,
    firstname: name.firstName(),
    emailAddress: `${name.firstName()}@gmail.com`,
    gender: random.arrayElement(GENDER_OPTIONS),
    lastname: name.lastName(),
    phoneNumber: phone.phoneNumber(),
}))

mock.onGet("/employees").reply(() => {
  return [200, { employees }];
});

mock.onPost("/employees/add").reply((request) => {
  try {
    const { firstname, lastname, emailAddress, gender, phoneNumber } = JSON.parse(request.data);
    const employee = {
      id: random.uuid(),
      firstname,
      lastname,
      emailAddress,
      gender,
      phoneNumber
    };

    employees = [...employees, employee];

    return [200, { employee }];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

mock.onPut("/employees/update").reply((request) => {
  try {
    const { employeeId, update } = JSON.parse(request.data);
    let employee = {};

    employees = _.map(employees, (_employee) => {
      if (_employee.id === employeeId) {
        _.assign(employee, { ...update });
        _.assign(_employee, { ...update });
      }

      return _employee;
    });

    return [200, { employee }];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

mock.onPost("/employees/remove").reply((request) => {
  try {
    const { employeeId } = JSON.parse(request.data);

    employees = _.reject(employees, { id: employeeId });

    return [200, { employeeId }];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

mock.onGet("/employee").reply((config) => {
  try {
    const { employeeId } = config.params;

    const employee = findEmployeeById(employeeId);

    if (employee) {
      return [200, { employee }];
    }
    return [500, { message: "Internal server error" }];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

const findEmployeeById = (employeeId: string): Employee.Infor | null => {
  const employee = employees.find((_employee) => _employee.id === employeeId);

  return employee || null;
};
