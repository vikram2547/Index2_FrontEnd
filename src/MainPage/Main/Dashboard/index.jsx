/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Admindashboard from './admindashboard';
import processedfiles from './processedfiles';
import unprocessedfiles from './unprocessedfiles';
import ImageViewerWithCropper from './ImageViewer';
import QcCheckedFiles from './qccheckedfiles';
import ApproveReject from './approvereject';
import UserProcessedfiles from './userprocessedfiles';
import UserApproveReject from './userapprovereject';
import EmployeeDashboard from './employeedashboard';
import Loginpage from '../../../initialpage/loginpage';
import UserQcCheckedFiles from './userqccheckedfiles';
import QcApproveReject from './qcapprovereject';

const DashboardRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
      <Route path={`${match.url}/login`} component={Loginpage} />
      <Route path={`${match.url}/dashboard`} component={Admindashboard} />
      <Route path={`${match.url}/user-dashboard`} component={EmployeeDashboard} />
      <Route path={`${match.url}/processed-files`} component={processedfiles} />
      <Route path={`${match.url}/unprocessed-files`} component={unprocessedfiles} />
      <Route path={`${match.url}/image-viewer`} component={ImageViewerWithCropper} />
      <Route path={`${match.url}/qcchecked-files`} component={QcCheckedFiles} />
      <Route path={`${match.url}/image-approve-reject`} component={ApproveReject} />
      <Route path={`${match.url}/user-processed-files`} component={UserProcessedfiles} />
      <Route path={`${match.url}/user-approve-reject`} component={UserApproveReject} />
      <Route path={`${match.url}/userqcchecked-files`} component={UserQcCheckedFiles} />
      <Route path={`${match.url}/qc-approve-reject`} component={QcApproveReject} />



   </Switch>

);

export default DashboardRoute;
