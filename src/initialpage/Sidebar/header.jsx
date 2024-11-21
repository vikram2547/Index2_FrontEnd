/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { headerlogo, Avatar_21 } from "../../Entryfile/imagepath";
import revertAll from "../../store/action";

const Header = (props) => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.login?.user?.id);

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const onMenuClik = () => {
    props.onMenuClick();
  };
  const handleLogout = () => {
    dispatch(revertAll());
  };

  let pathname = location.pathname;

  return (
    <div className="header" style={{ right: "0px" }}>
      <Link
        id="toggle_btn"
        to="#"
        style={{
          display: pathname.includes("tasks")
            ? "none"
            : pathname.includes("compose")
            ? "none"
            : "",
        }}
        onClick={handlesidebar}
      >
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </Link>
      {/* Header Title */}
      {/* <div className="page-title-box">
        <h3>Kash IT Solutions</h3>
      </div> */}
      {/* /Header Title */}
      <Link
        id="mobile_btn"
        className="mobile_btn"
        to="#"
        onClick={() => onMenuClik()}
      >
        <i className="fa fa-bars" />
      </Link>
      {/* Header Menu */}
      <ul className="nav user-menu">
        <li className="nav-item dropdown has-arrow main-drop">
          <Link
            to="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          ></Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link
              className="dropdown-item"
              to="/#"
              onClick={() => handleLogout()}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <Link
          to="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </Link>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
          <Link
            className="dropdown-item"
            to="/#"
            onClick={() => handleLogout()}
          >
            Logout
          </Link>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  );
};

export default withRouter(Header);
