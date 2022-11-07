import { Alert, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import * as yup from "yup";
import { useFormik } from 'formik';
import { connect } from "react-redux";
import { carsAction, loginAction } from '../../redux/actions';
import { carsSelectors, loginSelectors } from '../../redux/selectors';
import { createStructuredSelector } from 'reselect';
import Paper from '@mui/material/Paper';


function HomePage(props) {
    const { getCars,carsData } = props;
    useEffect(() => {
        getCars();
    }, [])

    return (
        <>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={6} lg={7}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Typography style={{ fontSize: 50, textAlign: 'center', marginTop: '10%' }}>
                            <b>
                                Cars Test Task
                            </b>
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <br />
                        <Typography style={{ fontSize: 36, textAlign: 'center' }}>
                            <b>
                                Cars Registered
                            </b>
                        </Typography>
                        <br />
                        <Typography style={{ fontSize: 30, textAlign: 'center' }}>
                            <b>
                                {carsData&&(carsData.length)}
                            </b>
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <br />
                        <Typography style={{ fontSize: 26, textAlign: 'center' }}>
                            <b>
                                About Us
                            </b>
                        </Typography>
                        <br />
                        <Typography >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            <br />
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock
                        </Typography>
                        <br />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
const mapStateToProps = createStructuredSelector({
    loginStatus: loginSelectors.makeSelectLoginStatus(),
    carsData: carsSelectors.makeSelectShowCars()

});
const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        getCars: () => {
            dispatch(carsAction.getAllCars());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
