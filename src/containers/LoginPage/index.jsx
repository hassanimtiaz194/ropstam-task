import { Alert, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import * as yup from "yup";
import { useFormik } from 'formik';
import { connect } from "react-redux";
import { loginAction } from '../../redux/actions';
import { loginSelectors } from '../../redux/selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const validationSchema = yup.object({
    userName: yup
        .string('Enter Username')
        .required('Username is Required'),
    password: yup
        .string('Enter your Password')
        .min(2, 'password Too Short!')
        .required('Password is Required'),
});

function LoginPage(props) {
    const navigation = useNavigate();
    const { loginApp, loginStatus } = props;
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            loginApp(values)
        },
    });

    useEffect(() => {
        if (loginStatus !== null && loginStatus !== undefined) {
            navigation('/home')
        }

    }, [loginStatus])



    return (
        <>
            <section style={{ backgroundColor: 'red' }}>hello</section>
            <Container maxWidth="sm" >
                <br />
                <Grid item xs={12}>
                    <Typography component='h2' style={{ textAlign: 'center', fontSize: 36 }}>
                        <b>
                            Welcome
                        </b>
                    </Typography>
                </Grid>
                <br />
                <br />
                {loginStatus === undefined && (
                    <Alert severity="error">Username or Password Incorrect</Alert>
                )}
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
                            name="userName"
                            style={{ minWidth: 130 }}
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            label=" Username"
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
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
                    <Grid id="signup-link" item sm={8} style={{ textAlign: "right" }}>
                        <Link onClick={(event) => {
                            event.preventDefault();
                            navigation('/register')
                        }} variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={formik.handleSubmit}

                    >Login</Button>
                </form>
            </Container>
            <footer style={{ backgroundColor: 'red', position: 'absolute', bottom: 0, width: '100%' }}>hhh</footer>
        </>
    );
}
const mapStateToProps = createStructuredSelector({
    loginStatus: loginSelectors.makeSelectLoginStatus()
});
const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        loginApp: (login) => {
            dispatch(loginAction.appLogin(login));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
