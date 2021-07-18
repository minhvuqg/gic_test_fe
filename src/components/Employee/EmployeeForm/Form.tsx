import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
} from "@material-ui/core";
import React, { useState, useEffect, FC } from "react";
import {
    Field,
    reduxForm,
} from "redux-form";
import type { InjectedFormProps } from "redux-form";
import { Prompt } from 'react-router-dom';
import { EMPLOYEE_FORM_NAME } from "src/constants/employee";
import EmployeeTextField from './EmployeeTextField';
import { GenderLabels, GenderRadioGroup } from './GenderFields';
import { formValidate as validate } from 'src/utils/formValidate';

interface IEmployeeForm extends InjectedFormProps<Employee.Infor> { }

const Form: FC<IEmployeeForm> = ({ handleSubmit, submitting, dirty, }) => {
    const [shouldShowPrompt, setShoudShowPrompt] = useState<boolean>(true);

    useEffect(() => {
        setShoudShowPrompt(true)
    }, [dirty])

    const onSubmit = () => {
        setShoudShowPrompt(false)
    }

    return (
        <>
            <Prompt
                when={dirty && shouldShowPrompt}
                message="Form has been modified. You will loose your unsaved changes. Are you sure you want to close this form?"
            />
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader title="Employee Form" />
                    <Divider />
                    <CardContent>
                        {(submitting) ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                my={5}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Grid
                                    container
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Field
                                            name="firstname"
                                            label="First Name"
                                            component={EmployeeTextField}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Field
                                            name="lastname"
                                            label="Last Name"
                                            component={EmployeeTextField}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container
                                    spacing={2}>
                                    <Grid item
                                        md={6}
                                        xs={12}>
                                        <Box mt={2} justifyContent={"flex-end"}>
                                            <Field
                                                name="emailAddress"
                                                label="Email Address"
                                                type="email"
                                                component={EmployeeTextField}
                                            />
                                        </Box>

                                    </Grid>
                                    <Grid item
                                        md={6}
                                        xs={12}>
                                        <Box mt={2}>
                                            <Field
                                                name="phoneNumber"
                                                label="Phone Number"
                                                component={EmployeeTextField}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box mt={2}>
                                    <Field
                                        name="gender"
                                        label="Gender"
                                        component={GenderRadioGroup}
                                    >
                                        {GenderLabels}
                                    </Field>
                                </Box>
                                <Box mt={2}
                                    display={"flex"}
                                    justifyContent={"flex-end"}>
                                    <Button
                                        color="secondary"
                                        disabled={submitting}
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </>
                        )}
                    </CardContent>
                </Card>
            </form>
        </>
    );
};

export default reduxForm({
    form: EMPLOYEE_FORM_NAME,
    validate,
    initialValues: {
        firstname: "",
        lastname: "",
        emailAddress: "",
        phoneNumber: "",
        gender: "Male",
    },
})(Form);