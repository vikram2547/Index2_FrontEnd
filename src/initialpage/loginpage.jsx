import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Loginpage = (props) => {
  const history = useHistory();

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
    history.push("/app/main/dashboard");
  };

 
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
                      <label>Email Address</label>
                      <input
                        type="text"
                        {...register("email")}
                        className="form-control"
                        placeholder="Enter your email address"
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