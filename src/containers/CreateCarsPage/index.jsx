import { Button, Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import React from 'react';
import * as yup from "yup";
import { useFormik } from 'formik';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { carsAction, categoryAction } from '../../redux/actions';
import { categorySelectors } from '../../redux/selectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    carName: yup
        .string('Enter Car Name')
        .min(2, 'Car Name Too Short!')
        .max(50, 'Car Name Too Long!')
        .required('Car Name is Required'),
    Make: yup
        .string('Enter Make')
        .min(2, 'Make Name Too Short!')
        .max(50, 'Make Name Too Long!')
        .required('Make is Required'),
    Model: yup
        .string('Enter Model')
        .required('Model is Required'),
    Color: yup
        .string('Enter Color')
        .min(2, 'Color Too Short!')
        .max(50, 'Color Too Long!')
        .required('Color is Required'),
    RegNo: yup
        .string('Enter Registration No')
        .min(2, 'Registration No Too Short!')
        .max(50, 'Registration No Too Long!')
        .required('Registration is Required'),
    Category: yup
        .string('Select a Category')
        .required('Category is Required'),
});
function CreateCarsPage(props) {
    const { categoryData, getCategoryData, createCar, getCarsData } = props;
    const navigation = useNavigate();
    const formik = useFormik({
        initialValues: {
            carName: '',
            Make: '',
            Model: '',
            Color: '',
            RegNo: '',
            Category: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createCar(values);
            navigation('/cars')
            getCarsData();
        },
    });

    useEffect(() => { getCategoryData() }, [])
    return (
        <Container maxWidth="sm" >
            <br />
            <Grid item xs={12}>
                <Typography component='h2' style={{ textAlign: 'center', fontSize: 36 }}>
                    <b>
                        Add Cars
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
                        name="carName"
                        style={{ minWidth: 130 }}
                        value={formik.values.carName}
                        onChange={formik.handleChange}
                        label="Car Name"
                        error={formik.touched.carName && Boolean(formik.errors.carName)}
                        helperText={formik.touched.carName && formik.errors.carName}
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
                        name="Make"
                        style={{ minWidth: 130 }}
                        value={formik.values.Make}
                        onChange={formik.handleChange}
                        label="Make"
                        error={formik.touched.Make && Boolean(formik.errors.Make)}
                        helperText={formik.touched.Make && formik.errors.Make}
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
                        name="Model"
                        style={{ minWidth: 130 }}
                        value={formik.values.Model}
                        onChange={formik.handleChange}
                        label="Model"
                        type='number'
                        error={formik.touched.Model && Boolean(formik.errors.Model)}
                        helperText={formik.touched.Model && formik.errors.Model}
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
                        name="Color"
                        style={{ minWidth: 130 }}
                        value={formik.values.Color}
                        onChange={formik.handleChange}
                        label="Color"
                        error={formik.touched.Color && Boolean(formik.errors.Color)}
                        helperText={formik.touched.Color && formik.errors.Color}
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
                        name="RegNo"
                        style={{ minWidth: 130 }}
                        value={formik.values.RegNo}
                        onChange={formik.handleChange}
                        label="Registration No"
                        error={formik.touched.RegNo && Boolean(formik.errors.RegNo)}
                        helperText={formik.touched.RegNo && formik.errors.RegNo}
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    {categoryData !== null && (
                        <Box sx={{ minWidth: 120 }}  >
                            <FormControl fullWidth required>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.Category}
                                    label="Categories"
                                    onChange={formik.handleChange}
                                    name='Category'
                                >
                                    {categoryData.map((row) => (
                                        <MenuItem value={row.category}>{row.category}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </Grid>
                <br />
                <br />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={formik.handleSubmit}

                >Submit</Button>
            </form>
        </Container>
    );
}
const mapStateToProps = createStructuredSelector({
    categoryData: categorySelectors.makeSelectShowCategory()
});
const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        getCategoryData: () => {
            dispatch(categoryAction.getAllCategory());
        },
        createCar: (data) => {
            dispatch(carsAction.createCar(data));
        },
        getCarsData: () => {
            dispatch(carsAction.getAllCars());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCarsPage);
