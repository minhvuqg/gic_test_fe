import { IsString, IsIn, IsEmail } from 'class-validator';
import { GENDER_OPTIONS } from 'src/constants/employee';

export class EmployeeDTO implements Employee.Infor {
  @IsEmail()
  emailAddress: string;

  @IsString()
  firstname: string;

  @IsIn(GENDER_OPTIONS)
  gender: Employee.TGender

  @IsString()
  id: string;

  @IsString()
  lastname: string;

  @IsString()
  phoneNumber: string;
}