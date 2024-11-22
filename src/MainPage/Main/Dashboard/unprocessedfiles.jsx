import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link, useHistory } from "react-router-dom";
import { getUnprocessedFiles } from "../../../store/getunprocesedfiles";
import { useDispatch, useSelector } from "react-redux";

const Unprocessedfiles = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const data =
    useSelector((state) => state.getunprocessedfiles.getunprocessedfiles) || [];

  console.log(data, "datadata");

  const columns = [
    {
      title: "File Name",
      dataIndex: "filename",
      sorter: (a, b) => a.filename.length - b.filename.length,
    },
    {
      title: "Action",
      render: (_, record) => (
        <i
          className="fa fa-eye action-icon"
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => handleEyeIconClick(record.id,record.filename)} 
        />
      ),
    },
  ];

  const handleEyeIconClick = (id,filename) => {
    localStorage.setItem("selectedFileId", id);
    localStorage.setItem("selectedFileName", filename);
    localStorage.setItem("page", 1);

    history.push("/app/main/image-viewer");
  };

  useEffect(() => {
    if (token) {
      dispatch(getUnprocessedFiles(token));
    }
  }, [dispatch, token]);

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        {/* Header and Sidebar */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Files</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Unprocessed Files
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
    </>
  );
};

export default Unprocessedfiles;
