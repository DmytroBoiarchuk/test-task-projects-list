import ProjectCard from "../ProjectCard/ProjectCard.tsx";

import { useProjects } from "../../hooks/useProjects.ts";
import Pagination from "../Pagination/Pagination.tsx";
import classes from "./ProjectsList.module.scss";
import ErrorModal from "../ErrorModal/ErrorModal.tsx";
import { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";

const ProjectsList = () => {
  const [response, curPage, setCurPage, error, isLoading] = useProjects(0);
  const [modalIsShow, setModalIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (error) setModalIsShow(true);
  }, [error]);

  if (isLoading) return <ImSpinner3 className={classes.loading} size={30} />;

  return (
    <main className={classes.main}>
      <ul className={classes.list}>
        {response?.projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </ul>
      <Pagination
        responseObj={response}
        setCurPage={setCurPage}
        curPage={curPage}
      />
      <ErrorModal modalIsShown={modalIsShow} setModalIsShown={setModalIsShow}>
        <p>{error}</p>
      </ErrorModal>
    </main>
  );
};

export default ProjectsList;
