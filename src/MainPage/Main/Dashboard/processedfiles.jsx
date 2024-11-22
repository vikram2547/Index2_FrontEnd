import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
// import "antd/dist/antd.min.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import {
  Avatar_02,
  Avatar_05,
  Avatar_11,
  Avatar_12,
  Avatar_09,
  Avatar_10,
  Avatar_13,
} from "../../../Entryfile/imagepath";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance";

const Processedfiles = () => {
  const [menu, setMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const data = [
    {
      id: 1,
      image: Avatar_02,
      name: "John Doe",
      role: "Web Designer",
      employee_id: "FT-0001",
      email: "johndoe@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
    },
    {
      id: 2,
      image: Avatar_05,
      name: "Richard Miles",
      role: "Web Developer",
      employee_id: "FT-0002",
      email: "richardmiles@example.com",
      mobile: "9876543210",
      joindate: "18 Mar 2014",
    },
    {
      id: 3,
      image: Avatar_11,
      name: "John Smith",
      role: "Android Developer",
      employee_id: "FT-0003",
      email: "johnsmith@example.com	",
      mobile: "9876543210",
      joindate: "1 Apr 2014",
    },
    {
      id: 4,
      image: Avatar_12,
      name: "Mike Litorus",
      role: "IOS Developer",
      employee_id: "FT-0004",
      email: "mikelitorus@example.com",
      mobile: "9876543210",
      joindate: "1 Apr 2014",
    },
    {
      id: 5,
      image: Avatar_09,
      name: "Wilmer Deluna",
      role: "Team Leader",
      employee_id: "FT-0005",
      email: "wilmerdeluna@example.com",
      mobile: "9876543210",
      joindate: "22 May 2014",
    },
    {
      id: 6,
      image: Avatar_10,
      name: "Jeffrey Warden",
      role: "Web Developer",
      employee_id: "FT-0006",
      email: "jeffreywarden@example.com",
      mobile: "9876543210",
      joindate: "16 Jun 2013",
    },
    {
      id: 7,
      image: Avatar_13,
      name: "Bernardo Galaviz",
      role: "Web Developer",
      employee_id: "FT-0007",
      email: "bernardogalaviz@example.com",
      mobile: "9876543210",
      joindate: "1 Jan 2013",
    },
  ];

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const columns = [
    {
      title: "File Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },

    // {
    //   title: "Mobile",
    //   dataIndex: "mobile",
    //   sorter: (a, b) => a.mobile.length - b.mobile.length,
    // },
    {
      title: "Action",
      render: (record) => (
        <div className="action-icons text-end">
          <Link
            to="#"
            onClick={() => handleView(record)}
            className="action-icon"
          >
            <i className="fa fa-eye m-r-5" /> {/* View Icon */}
          </Link>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Files</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Processed Files
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: data.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    bordered
                    dataSource={data}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas />
    </>
  );
};

export default Processedfiles;
