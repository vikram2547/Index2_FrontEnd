/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Admindashboard from './admindashboard';
import processedfiles from './processedfiles';
import unprocessedfiles from './unprocessedfiles';
import Scanner from './Scanner';
// import Employeedashboard from './employeedashboard';

const DashboardRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
      <Route path={`${match.url}/dashboard`} component={Admindashboard} />
      <Route path={`${match.url}/processed-files`} component={processedfiles} />
      <Route path={`${match.url}/unprocessed-files`} component={unprocessedfiles} />
      {/* <Route path={`${match.url}/scanner`} component={Scanner} /> */}

      {/* <Route path={`${match.url}/employee-dashboard`} component={Employeedashboard} /> */}
   </Switch>

);

export default DashboardRoute;
