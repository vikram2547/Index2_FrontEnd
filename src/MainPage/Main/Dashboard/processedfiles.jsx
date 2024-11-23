import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance";
import { useDispatch, useSelector } from "react-redux";
import { getProcessedFile } from "../../../store/getprocessedfile";

const Processedfiles = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.login.token);
  const data = useSelector((state) => state.getprocessedfile.getprocessedfile) || [];
  console.log(data, "data");
  
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
      title: "Processed By",
      dataIndex: "processed_by",
      render: (text, record) => record.processed_by, // Render processed_by field
    },

    {
      title: "File Path",
      dataIndex: "file",
      render: (text, record) => record.file, // Render file path
    },

    {
      title: "Processed At",
      dataIndex: "processed_at",
      render: (text, record) => new Date(record.processed_at).toLocaleString(), // Render date in a readable format
    },

    {
      title: "QC Check",
      dataIndex: "qc_check",
      render: (text, record) => (record.qc_check ? "Passed" : "Failed"), // Render QC check status
    },

    {
      title: "Action",
      render: (record) => (
        <div className="action-icons text-end">
          <button
            onClick={() => handleApprove(record)}
            className="btn btn-success action-icon"
          >
            Approve
          </button>
        </div>
      ),
    }
  ];

  useEffect(() => {
    if (token) {
      dispatch(getProcessedFile(token));
    }
  }, [dispatch, token]);

  const handleApprove = (record) => {
    // Handle approve action
    console.log("Approving record:", record);
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
                    <li className="breadcrumb-item active">Processed Files</li>
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
                      showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
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

export default Processedfiles;
