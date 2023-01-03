import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProjectBoard from "./components/board/ProjectBoard";
import AddProjectTask from "./components/board/tasks/AddProjectTask";
import UpdateProjectTask from "./components/board/tasks/UpdateProjectTask";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";

import jwt_decode from "jwt-decode";
import { setJWTToken } from "./utils/JWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/authActions";

const jwtToken = localStorage.getItem("jwtToken");
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/update/:id" element={<UpdateProject />} />
            <Route path="/board/:id" element={<ProjectBoard />} />
            <Route path="/add/:id" element={<AddProjectTask />} />
            <Route
              path="/update/:backlog_id/:pt_id"
              element={<UpdateProjectTask />}
            />
            <Route path="/addProject" element={<AddProject />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
