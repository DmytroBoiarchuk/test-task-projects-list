import ProjectCard from "../ProjectCard/ProjectCard.tsx";

import { useProjects } from "../../hooks/useProjects.ts";
import Pagination from "../Pagination/Pagination.tsx";
import classes from './ProjectsList.module.scss'

const ProjectsList = () => {
  const [response, curPage, setCurPage] = useProjects(0);

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
    </main>
  );
};

export default ProjectsList;
