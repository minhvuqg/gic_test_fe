import {
    Breadcrumbs,
    Link,
    Typography,
    makeStyles,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

interface IHeaderProps {
    label: string;
}

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: "1rem"
    },
}));

const Header: FC<IHeaderProps> = ({ label, ...rest }) => {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
            {...rest}
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link
                    variant="body1"
                    color="inherit"
                    to="/app"
                    component={RouterLink}
                >
                    Employee
                </Link>
                <Typography
                    variant="body1"
                    color="textPrimary"
                >
                    {label}
                </Typography>
            </Breadcrumbs>
        </div>
    );
};


export default Header;
