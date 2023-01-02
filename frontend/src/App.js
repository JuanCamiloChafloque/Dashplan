import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProjectBoard from "./components/board/ProjectBoard";
import AddProjectTask from "./components/board/tasks/AddProjectTask";
import UpdateProjectTask from "./components/board/tasks/UpdateProjectTask";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
  );
}

export default App;
