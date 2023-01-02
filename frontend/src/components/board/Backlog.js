import React from "react";
import ProjectTask from "./tasks/ProjectTask";

const Backlog = ({ tasks }) => {
  const todoTasks = tasks.filter((task) => task.status === "TO_DO");
  const progressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
  const doneTasks = tasks.filter((task) => task.status === "DONE");

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todoTasks.map((task) => (
              <ProjectTask key={task.id} task={task} />
            ))}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {progressTasks.map((task) => (
              <ProjectTask key={task.id} task={task} />
            ))}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneTasks.map((task) => (
              <ProjectTask key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Backlog;
