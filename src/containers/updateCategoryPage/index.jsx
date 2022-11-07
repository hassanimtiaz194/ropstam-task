import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import * as yup from "yup";
import { useFormik } from 'formik';
import { connect } from "react-redux";
import { categoryAction } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { categorySelectors } from '../../redux/selectors';
import { createStructuredSelector } from 'reselect';

const validationSchema = yup.object({
    category: yup
        .string('Enter Category')
        .min(2, 'Category Too Short!')
        .max(50, 'Category Too Long!')
        .required('Category is Required'),
});
function UpdateCategoryPage(props) {
    const {updateCategoryData, dataUpdation } = props;

    const navigation = useNavigate();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            id: dataUpdation?.id,
            category: dataUpdation?.category
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateCategoryData(values)
            navigation('/categorys')
        },
    });

    

    return (
        <>
            {dataUpdation && (
                <Container maxWidth="sm" >
                    <br />
                    <Grid item xs={12}>
                        <Typography component='h2' style={{ textAlign: 'center', fontSize: 36 }}>
                            <b>
                                Update Category
                            </b>
                        </Typography>
                    </Grid>
                    <br />
                    <br />
                    <form>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="id"
                                style={{ minWidth: 130 }}
                                value={formik.values.id}
                                onChange={formik.handleChange}
                                label="Id"
                                disabled
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
            )}
        </>
    );
}
const mapStateToProps = createStructuredSelector({
    dataUpdation: categorySelectors.makeSelectShowCategoryUpdation()
});

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        createCategory: (data) => {
            dispatch(categoryAction.createCategory(data));
        },
        getCategoryData: () => {
            dispatch(categoryAction.getAllCategory());
        },
        updateCategoryData: (data) => {
            dispatch(categoryAction.updatingData(data));
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategoryPage);
