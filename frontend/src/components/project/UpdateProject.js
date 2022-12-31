import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { getProjectById, createProject } from "../../actions/projectsActions";

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  const error = useSelector((state) => state.errors);

  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectIdentifier, setProjectIdentifier] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  useEffect(() => {
    dispatch(getProjectById(id));
    if (project) {
      setProjectId(project.id);
      setProjectName(project.projectName);
      setProjectIdentifier(project.projectIdentifier);
      setDescription(project.description);
      setStartDate(project.start_date);
      setEndDate(project.end_date);
    }
  }, [dispatch, id]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updatedProject = {
      id: projectId,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    };
    dispatch(createProject(updatedProject, navigate));
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  {error.projectName && (
                    <p className="invalid-feedback">{error.projectName}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={projectIdentifier}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.projectName,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {error.description && (
                    <p className="invalid-feedback">{error.description}</p>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
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

export default UpdateProject;
