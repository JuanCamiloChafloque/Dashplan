import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { login } from "../../actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.errors);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const loginRequest = {
      username,
      password,
    };
    dispatch(login(loginRequest, navigate));
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.username,
                    })}
                    placeholder="Email Address"
                    name="email"
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
