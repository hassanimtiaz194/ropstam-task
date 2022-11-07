import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import * as yup from "yup";
import { useFormik } from 'formik';
import { connect } from "react-redux";
import { categoryAction } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const validationSchema = yup.object({
    category: yup
        .string('Enter Category')
        .min(2, 'Category Too Short!')
        .max(50, 'Category Too Long!')
        .required('Category is Required'),
});
function CreateCategoryPage(props) {
    const { createCategory, getCategoryData } = props;
    const navigation = useNavigate();
    const formik = useFormik({
        initialValues: {
            category: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            createCategory(values)
            getCategoryData();
            navigation('/categorys')
        },
    });
   
    return (
        <Container maxWidth="sm" >
            <br />
            <Grid item xs={12}>
                <Typography component='h2' style={{ textAlign: 'center', fontSize: 36 }}>
                    <b>
                        Add Category
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
                        name="category"
                        style={{ minWidth: 130 }}
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        label="Category"
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                    />
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
const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        createCategory: (data) => {
            dispatch(categoryAction.createCategory(data));
        },
        getCategoryData: () => {
            dispatch(categoryAction.getAllCategory());
        },
    };
};


export default connect(null, mapDispatchToProps)(CreateCategoryPage);
