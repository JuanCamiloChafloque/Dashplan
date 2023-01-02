import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePTbyBacklogId } from "../../../actions/backlogActions";

const ProjectTask = ({ task }) => {
  const dispatch = useDispatch();

  let priorityString;
  let priorityClass;

  if (task.priority === 1) {
    priorityClass = "bg-danger text-light";
    priorityString = "HIGH";
  }

  if (task.priority === 2) {
    priorityClass = "bg-warning text-light";
    priorityString = "MEDIUM";
  }

  if (task.priority === 3) {
    priorityClass = "bg-info text-light";
    priorityString = "LOW";
  }

  const onDeleteHandler = (backlog_id, pt_id) => {
    dispatch(deletePTbyBacklogId(backlog_id, pt_id));
  };

  return (
    <>
      <div className="card mb-1 bg-light">
        <div className={"card-header text-primary " + priorityClass}>
          ID: {task.projectSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{task.summary}</h5>
          <p className="card-text text-truncate ">{task.acceptanceCriteria}</p>
          <Link
            to={
              "/update/" + task.projectIdentifier + "/" + task.projectSequence
            }
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={() =>
              onDeleteHandler(task.projectIdentifier, task.projectSequence)
            }
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectTask;
