import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLoginData } from "../store/login";

const Loginpage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.login.token);
  const login = useSelector((state) => state.login.loginData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [eye, setEye] = useState(true);

  const onEyeClick = () => {
    setEye(!eye);
  };

  const onSubmit = async (data) => {
    dispatch(getLoginData(data));
  };
  useEffect(() => {
    if (token) {
      history.push("/app/main/dashboard");
    }
  }, [token, history]);

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <Helmet>
          {/* <title>Kash IT</title> */}
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="account-content">
          <div className="container">
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-block">
                      <label>Username</label>
                      <input
                        type="text"
                        {...register("username")}
                        className="form-control"
                        placeholder="Enter your username"
                      />
                      <small>{errors.email?.message}</small>
                    </div>
                    <div className="input-block">
                      <div className="row">
                        <div className="col">
                          <label>Password</label>
                        </div>
                      </div>
                      <div style={{ position: "relative" }}>
                        <input
                          type={eye ? "password" : "text"}
                          className="form-control"
                          placeholder="Enter your password"
                          {...register("password")}
                        />
                        <span
                          style={{
                            position: "absolute",
                            right: "5%",
                            top: "30%",
                          }}
                          onClick={onEyeClick}
                          className={`toggles-password fa toggle-password ${
                            eye ? "fa-eye-slash" : "fa-eye"
                          } `}
                        />
                      </div>
                      <small>{errors.password?.message}</small>
                    </div>
                    <div className="input-block text-center">
                      <button
                        className="btn btn-primary account-btn"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
