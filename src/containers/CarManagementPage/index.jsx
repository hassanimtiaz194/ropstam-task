import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Grid, Typography, Container, TableHead, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { connect } from "react-redux";
import { carsAction, categoryAction } from '../../redux/actions';
import { carsSelectors, categorySelectors, loginSelectors } from '../../redux/selectors';
import { createStructuredSelector } from 'reselect';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};




function CarsManagementPage(props) {
    const { getCarsData, carsData, deletCarData, updateCarData } = props;
    console.log(carsData)
    const navigation = useNavigate()

    React.useEffect(() => {
        getCarsData();
    }, [])
    let rows = carsData?.sort((a, b) => (a.model < b.model ? -1 : 1));

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>
            {carsData !== null && (<>
                <br />
                <Grid item xs={12}>
                    <Typography component='h2' style={{ textAlign: 'center', fontSize: 36 }}>
                        <b>
                            Car Data Management
                        </b>
                    </Typography>
                </Grid>
                <br />
                <br />
                <Grid item xs={12} align="right" style={{ paddingRight: 25 }}>
                    <Button variant="contained" onClick={(event) => { event.preventDefault(); navigation('/addCars') }}><AddIcon />Create</Button>
                </Grid>
                <br />
                <Container maxWidth="lg" >
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                            <TableHead style={{ backgroundColor: 'black', color: 'white' }}>
                                <TableRow>
                                    <TableCell align='center' style={{ color: 'white' }}>Name</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>Make</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>Model</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>Registration No</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>Color</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>Category</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell style={{ width: 160 }} align='center'>
                                            {row.name}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align='center'>
                                            {row.make}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align='center'>
                                            {row.model}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align='center'>
                                            {row.regNo}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align='center'>
                                            {row.color}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align='center'>
                                            {row.category}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align='center'>
                                            <IconButton onClick={(event) => {
                                                event.preventDefault();
                                                updateCarData(row.id);
                                                navigation('/updateCars')
                                            }}>
                                                <UpdateIcon />
                                            </IconButton>
                                            <IconButton onClick={(event) => {
                                                event.preventDefault();
                                                deletCarData(row.id);
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Container>
            </>
            )}
        </>
    );
}
const mapStateToProps = createStructuredSelector({
    loginStatus: loginSelectors.makeSelectLoginStatus(),
    carsData: carsSelectors.makeSelectShowCars(),
});
const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        getCarsData: () => {
            dispatch(carsAction.getAllCars());
        },
        deletCarData: (data) => {
            dispatch(carsAction.deleteCar(data));
        },
        updateCarData: (data) => {
            dispatch(carsAction.updateCars(data));
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CarsManagementPage);