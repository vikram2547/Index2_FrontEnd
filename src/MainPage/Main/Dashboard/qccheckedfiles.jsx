import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import Offcanvas from "../../../Entryfile/offcanvance";
import { useDispatch, useSelector } from "react-redux";
import { getQcCheckedFile } from "../../../store/getqccheckedfiles";

const QcCheckedFiles = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.login.token);
  const data =
    useSelector((state) => state.getprocessedfile.getprocessedfile) || [];

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const handleDownload = (record) => {
    const fileUrl = `${API_HOST}path/to/download/${record.id}`; // Construct the download URL based on the record
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = record.fileName || "file.pdf"; // Provide a default name if not available in record
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      dataIndex: "filename",
      sorter: (a, b) => a.filename.length - b.filename.length,
    },

    {
      title: "Action",
      render: (record) => (
        <div className="action-icons text-end">
          <button
            onClick={() => handleDownload(record)} // Trigger download on click
            className="btn btn-primary action-icon"
          >
            Download
          </button>
        </div>
      ),
    }
    
  ];

  useEffect(() => {
    if (token) {
      dispatch(getQcCheckedFile(token));
    }
  }, [dispatch, token]);

  const handleView = (record) => {};

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
                    dataSource={Array.isArray(data) ? data : []}                  />
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

export default QcCheckedFiles;
