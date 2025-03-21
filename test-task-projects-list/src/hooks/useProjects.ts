import { useEffect, useState } from "react";
import { ProjectsResponseInterface } from "../interfaces";
import { getProjects } from "../api";

export const useProjects = (page: number) => {
  const [curPage, setCurPage] = useState(page);
  const [response, setResponse] = useState<ProjectsResponseInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const projects = await getProjects(curPage);
      setResponse(projects);
    };
    fetchProjects().catch((error) => {
        setError(error.message);
    }).finally(()=> setIsLoading(false));
  }, [curPage]);
  return [response, curPage, setCurPage, error, isLoading] as const;
};
