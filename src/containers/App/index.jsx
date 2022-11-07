import React, { useEffect, Fragment } from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import LoginPage from "../LoginPage";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { authAction } from "../../redux/actions";
import RegisterPage from "../RegisterPage";
import DashboardLayout from "../DashboardLayout";
import HomePage from "../HomePage";

function App(props) {
  /*  const { initApp } = props
   useEffect(() => { initApp() }, [])
  */

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<DashboardLayout />} />
            <Route path="/cars" element={<DashboardLayout />} />
            <Route path="/categorys" element={<DashboardLayout />} />
            <Route path="/addCars" element={<DashboardLayout />} />
            <Route path="/addCategory" element={<DashboardLayout />} />
            <Route path="/updateCategory" element={<DashboardLayout />} />
            <Route path="/updateCars" element={<DashboardLayout />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  );
}


/* const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    initApp: () => {
      dispatch(authAction.appIntialization());
    }
  };
}; */

export default connect(null, null)(App);
