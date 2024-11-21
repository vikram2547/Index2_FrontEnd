/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./loginpage";
import RegistrationPage from "./RegistrationPage";
import ForgotPassword from "./forgotpassword";
import OTP from "./otp";
import LockScreen from "./lockscreen";

//Main App
import DefaultLayout from "./Sidebar/DefaultLayout";
import Settinglayout from "./Sidebar/Settinglayout";
import Tasklayout from "./Sidebar/tasklayout";
import Emaillayout from "./Sidebar/emaillayout";
import chatlayout from "./Sidebar/chatlayout";


export default class App extends Component {
  componentDidMount() {
    if (
      location.pathname.includes("login") ||
      location.pathname.includes("register") ||
      location.pathname.includes("forgotpassword") ||
      location.pathname.includes("otp") ||
      location.pathname.includes("lockscreen")
    ) {
      // $('body').addClass('account-page');
    } else if (
      location.pathname.includes("error-404") ||
      location.pathname.includes("error-500")
    ) {
      $("body").addClass("error-page");
    }
  }
  render() {
    const { location } = this.props;

    if (location.pathname === "/") {
      return <Redirect to={"/login"} />;
    }

    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/otp" component={OTP} />
        <Route path="/lockscreen" component={LockScreen} />


        <Route path="/app" component={DefaultLayout} />
        <Route path="/settings" component={Settinglayout} />
        <Route path="/tasks" component={Tasklayout} />
        <Route path="/email" component={Emaillayout} />
        <Route path="/conversation" component={chatlayout} />
      </Switch>
    );
  }
}
