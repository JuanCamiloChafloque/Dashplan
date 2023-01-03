import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { createNewUser } from "../../actions/authActions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.errors);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      confirmPassword,
      fullName,
    };
    dispatch(createNewUser(newUser, navigate));
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.fullName,
                    })}
                    placeholder="Name"
                    name="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {error.fullName && (
                    <p className="invalid-feedback">{error.fullName}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.username,
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {error.username && (
                    <p className="invalid-feedback">{error.username}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error.password && (
                    <p className="invalid-feedback">{error.password}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.confirmPassword,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {error.confirmPassword && (
                    <p className="invalid-feedback">{error.confirmPassword}</p>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
