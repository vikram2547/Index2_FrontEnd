/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenunew, setSideMenuNew] = useState("dashboard");

  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);

  const toggleSidebar = (value) => {
    setSideMenu(value);
    setSideMenuNew(value);
  };

  useEffect(() => {
    if (
      isMouseOverSidebar &&
      document.body.classList.contains("mini-sidebar")
    ) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);

  const handleMouseEnter = () => {
    setMouseOverSidebar(true);
  };

  const handleMouseLeave = () => {
    setMouseOverSidebar(false);
  };

  let pathname = props.location.pathname;
  return (
    <div
      className={`sidebar ${isSidebarExpanded ? "" : "hidden"}`}
      id="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <nav className="greedys sidebar-horizantal" id="horizantal-sidebar">
              <ul className="list-inline-item list-unstyled links">
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    className={isSideMenu == "dashboard" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "dashboard" ? "" : "dashboard"
                      )
                    }
                  >
                    <i className="la la-dashboard" /> <span> Dashboard</span>{" "}
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "dashboard" ? (
                    <ul
                      style={{
                        display: isSideMenu == "dashboard" ? "block" : "none",
                      }}
                    ></ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </nav>
            <ul className="sidebar-vertical" id="veritical-sidebar">
              <li className="menu-title">
                <span>Home</span>
              </li>
              {/* Dashboard Menu */}
              <li className="submenu">
                <Link
                  to="/app/main/dashboard"
                  className={isSideMenu == "dashboard" ? "subdrop" : ""}
                  onClick={() =>
                    toggleSidebar(isSideMenu == "dashboard" ? "" : "dashboard")
                  }
                >
                  <i className="la la-dashboard" /> <span> Dashboard</span>{" "}
                </Link>
              </li>
             

              <li className="submenu">
                <Link to="/app/main/unprocessed-files">
                <i className="la la-exclamation-circle" />{" "}
                  <span> Unprocessed Files</span>{" "}
                </Link>
              </li>
              <li className="submenu">
                <Link to="/app/main/processed-files">
                <i className="la la-check-circle" />{" "}
                  <span> QC Files</span>{" "}
                </Link>
              </li>
              <li className="submenu">
                <Link to="/app/main/qcchecked-files">
                <i className="la la-check-circle" />{" "}
                  <span> QC Checked Files</span>{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
      <div className="two-col-bar" id="two-col-bar">
        <div className="sidebar sidebar-twocol">
          <div className="sidebar-left slimscroll">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <Link
                className="nav-link"
                id="v-pills-dashboard-tab"
                title="Dashboard"
                data-bs-toggle="pill"
                to="#v-pills-dashboard"
                role="tab"
                aria-controls="v-pills-dashboard"
                aria-selected="true"
              >
                <span
                  className="material-icons-outlined"
                  onClick={() =>
                    setSideMenuNew(
                      isSideMenunew == "dashboard" ? "" : "dashboard"
                    )
                  }
                >
                  home
                </span>
              </Link>
              <Link
                className="nav-link"
                id="v-pills-apps-tab"
                title="Apps"
                data-bs-toggle="pill"
                to="#v-pills-apps"
                role="tab"
                aria-controls="v-pills-apps"
                aria-selected="false"
              >
                <span
                  className="material-icons-outlined"
                  onClick={() =>
                    toggleSidebar(isSideMenu == "apps" ? "" : "apps")
                  }
                >
                  dashboard
                </span>
              </Link>
            </div>
          </div>
          <div className="sidebar-right">
            <div className="tab-content" id="v-pills-tabContent">
              {isSideMenunew == "dashboard" ? (
                <div
                  className="tab-pane fade active show"
                  id="v-pills-dashboard"
                  role="tabpanel"
                  aria-labelledby="v-pills-dashboard-tab"
                >
                  <p>Dashboard</p>
                  <ul></ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
