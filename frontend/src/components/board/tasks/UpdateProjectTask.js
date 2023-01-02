import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import classnames from "classnames";
import {
  getPTbyBacklogId,
  updatePTbyBacklogId,
} from "../../../actions/backlogActions";

const UpdateProjectTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backlog_id, pt_id } = useParams();

  const { projectTask } = useSelector((state) => state.backlog);
  const error = useSelector((state) => state.errors);

  const [projectTaskId, setProjectTaskId] = useState("");
  const [summary, setSummary] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getPTbyBacklogId(backlog_id, pt_id, navigate));
  }, [dispatch, navigate, backlog_id, pt_id]);

  useEffect(() => {
    if (projectTask) {
      setProjectTaskId(projectTask.id);
      setSummary(projectTask.summary);
      setAcceptanceCriteria(projectTask.acceptanceCriteria);
      setDueDate(projectTask.dueDate);
      setPriority(projectTask.priority);
      setStatus(projectTask.status);
    }
  }, [projectTask]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updatedProjectTask = {
      id: projectTaskId,
      projectIdentifier: backlog_id,
      summary,
      acceptanceCriteria,
      dueDate,
      priority,
      status,
    };
    dispatch(
      updatePTbyBacklogId(backlog_id, pt_id, updatedProjectTask, navigate)
    );
  };

  return (
    <>
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={"/board/" + backlog_id} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                Project Name: {backlog_id} + Project Task ID: {pt_id}
              </p>
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

export default UpdateProjectTask;
