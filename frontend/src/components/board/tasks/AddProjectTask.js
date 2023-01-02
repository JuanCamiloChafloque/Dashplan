import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { addProjectTask } from "../../../actions/backlogActions";

const AddProjectTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const error = useSelector((state) => state.errors);

  const [summary, setSummary] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newProjectTask = {
      projectIdentifier: id,
      summary,
      acceptanceCriteria,
      dueDate,
      priority,
      status,
    };
    dispatch(addProjectTask(id, newProjectTask, navigate));
  };

  return (
    <>
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/board/" + id} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Add Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.summary,
                    })}
                    placeholder="Project Task summary"
                    name="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                  {error.summary && (
                    <p className="invalid-feedback">{error.summary}</p>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={acceptanceCriteria}
                    onChange={(e) => setAcceptanceCriteria(e.target.value)}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectTask;
