import { Alert, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import * as yup from "yup";
import { useFormik } from 'formik';
import { connect } from "react-redux";
import { loginAction, registerAction } from '../../redux/actions';
import { loginSelectors } from '../../redux/selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';


const validationSchema = yup.object({
    Name: yup
        .string('Enter your Name')
        .min(2, 'Name Too Short!')
        .max(50, 'Name Too Big!')
        .required('Name is Required'),
    Email: yup
        .string('Enter Email')
        .email('Enter a valid email')
        .required('Email is Required'),
    password: yup
        .string('Enter password')
        .min(8, 'Password should be of minimum 8 characters length')
        .matches(/[0-9]/, 'Contains at least one number')
        .matches(/[A-Z]/, 'Contains at least one capital letter')
        .matches(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/, 'Contains at least one special character')
        .required('Password is required')
});

function RegisterPage(props) {
    const { registerUser } = props;
    const navigation = useNavigate();
    const formik = useFormik({
        initialValues: {
            Name: '',
            Email: '',
            password: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            registerUser(values)
            navigation('/')
        },
    });

    return (
        <Container maxWidth="sm" >
            <br />
            <Grid item xs={12}>
                <Typography component='h2' style={{ textAlign: 'center', fontSize: 36 }}>
                    <b>
                        Sign Up
                    </b>
                </Typography>
            </Grid>
            <br />
            <br />
            <form>
                <Grid item xs={12}>
                    <TextField
                        inputProps={{
                            autoComplete: "on"
                        }}
                        variant="outlined"
                        fullWidth
                        required
                        name="Name"
                        style={{ minWidth: 130 }}
                        value={formik.values.Name}
                        onChange={formik.handleChange}
                        label="Name"
                        error={formik.touched.Name && Boolean(formik.errors.Name)}
                        helperText={formik.touched.Name && formik.errors.Name}
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        inputProps={{
                            autoComplete: "on"
                        }}
                        variant="outlined"
                        fullWidth
                        required
                        name="Email"
                        style={{ minWidth: 130 }}
                        value={formik.values.Email}
                        onChange={formik.handleChange}
                        label=" Email"
                        error={formik.touched.Email && Boolean(formik.errors.Email)}
                        helperText={formik.touched.Email && formik.errors.Email}
                        type='email'
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        inputProps={{
                            autoComplete: "on"
                        }}
                        variant="outlined"
                        fullWidth
                        required
                        name="password"
                        style={{ minWidth: 130 }}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        label="Password"
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        inputProps={{
                            autoComplete: "on"
                        }}
                        variant="outlined"
                        fullWidth
                        name="phone"
                        style={{ minWidth: 130 }}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        label="Phone"
                        type='number'
                    />
                </Grid>
                <br />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={formik.handleSubmit}

                >Sign Up</Button>
            </form>
        </Container>
    );
}
/* const mapStateToProps = createStructuredSelector({
    loginStatus: loginSelectors.makeSelectLoginStatus()
}); */
const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        registerUser: (user) => {
            dispatch(registerAction.registerUser(user));
        }
    };
};

export default connect(null, mapDispatchToProps)(RegisterPage);
