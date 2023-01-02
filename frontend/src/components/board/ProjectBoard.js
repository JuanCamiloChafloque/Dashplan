import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBacklog } from "../../actions/backlogActions";
import Backlog from "./Backlog";

const ProjectBoard = () => {
  const dispatch = useDispatch();
  const { projectTasks } = useSelector((state) => state.backlog);
  const error = useSelector((state) => state.errors);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBacklog(id));
  }, [dispatch, id]);

  const Board = () => {
    if (projectTasks.length < 1) {
      if (error.projectNotFound) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {error.projectNotFound}
          </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
            No project tasks on this board
          </div>
        );
      }
    } else {
      return <Backlog tasks={projectTasks} />;
    }
  };

  return (
    <>
      <div className="container">
        <Link to={"/add/" + id} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <Board />
      </div>
    </>
  );
};

export default ProjectBoard;
