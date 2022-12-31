import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
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
          <Route path="/addProject" element={<AddProject />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
