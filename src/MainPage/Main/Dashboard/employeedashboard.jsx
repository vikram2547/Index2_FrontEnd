/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar';
import Offcanvas from '../../../Entryfile/offcanvance/index.jsx';

const EmployeeDashboard = () => {

  const [menu, setMenu] = useState(false)

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  return (
    <>



      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Dashboard - HRMS Admin Template</title>
            <meta name="description" content="Dashboard" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="welcome-box">
                  <div className="welcome-img">
                  </div>
                  <div className="welcome-det">
                    <h3>Welcome</h3>
                    <p>User Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          {/* /Page Content */}
        </div>
      </div>
      <Offcanvas />
    </>

  );
}

export default EmployeeDashboard;
