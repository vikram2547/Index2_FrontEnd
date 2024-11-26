import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance";
import { useDispatch, useSelector } from "react-redux";
import { getQcCheckedFile } from "../../../store/getqccheckedfiles";

const UserQcCheckedFiles = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.login.token);
  const data =
    useSelector((state) => state.getqccheckedfiles.getqccheckedfiles) || [];

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

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
      dataIndex: "filename", // Adjust to match the response structure
      render: (text, record) => record.filename.filename, // Access the filename nested property
      sorter: (a, b) => a.filename.filename.length - b.filename.filename.length,
    },

    {
      title: "Action",
      render: (_, record) => (
        <i
          className="fa fa-eye action-icon"
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => handleEyeIconClick(record.id)} 
        />
      ),
    },
  ];

  useEffect(() => {
    if (token) {
      dispatch(getQcCheckedFile(token));
    }
  }, [dispatch, token]);

 const handleEyeIconClick = (id) => {
    localStorage.setItem("UserPdfFileId", id);

    history.push("/app/main/user-approve-reject");
  };


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
                    <li className="breadcrumb-item active">Approved Files</li>
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
                    dataSource={Array.isArray(data) ? data : []}
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

export default UserQcCheckedFiles;
