import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBacklog } from "../../actions/backlogActions";
import Backlog from "./Backlog";

const ProjectBoard = () => {
  const dispatch = useDispatch();
  const { projectTasks } = useSelector((state) => state.backlog);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBacklog(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="container">
        <Link to={"/add/" + id} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <Backlog tasks={projectTasks} />
      </div>
    </>
  );
};

export default ProjectBoard;
