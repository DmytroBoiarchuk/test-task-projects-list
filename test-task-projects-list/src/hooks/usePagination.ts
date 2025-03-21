import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ProjectsResponseInterface } from "../interfaces";
import { useMedia } from "./useMedia.ts";

const numberOfShownPages = 7;

const calcPaginationArrayLength = (totalPages: number, pInterval: number) => {
  if (totalPages > numberOfShownPages)
    return (pInterval + 1) * numberOfShownPages < totalPages ? numberOfShownPages : totalPages % numberOfShownPages;
  else return totalPages;
};

export const usePagination = (
  projectData: ProjectsResponseInterface | undefined,
  setCurPage: Dispatch<SetStateAction<number>>,
) => {
  const [pInterval, setPInterval] = useState<number>(0);
  const lessThen768 = useMedia("(max-width: 768px)");
  const paginationToRender = useMemo(() => {
    if (projectData)
      return Array.from(
        {
          length: !lessThen768 ? calcPaginationArrayLength(projectData.totalPages, pInterval) : 3

        },
        (_, i) =>
          projectData.totalPages > numberOfShownPages
            ? i + 1 + pInterval * numberOfShownPages
            : i + 1,
      );
    else return [];
  }, [projectData?.totalPages, pInterval, lessThen768]);
  const nextPage = () => {
    if (projectData && projectData.currentPage + 1 !== projectData.totalPages) {
      setCurPage((prevState) => prevState + 1);
      if (
        projectData.currentPage >
        paginationToRender[paginationToRender.length - 3]
      ) {
        setPInterval((prevState) => prevState + 1);
      }
    }
  };
  const prevPage = () => {
    if (projectData && projectData.currentPage !== 0) {
      setCurPage((prevState) => prevState - 1);
      if (projectData.currentPage < paginationToRender[0]) {
        setPInterval((prevState) => prevState - 1);
      }
    }
  };
  const nextIntPage = () => {
    setPInterval((prevState) => prevState + 1);
  };
  const prevIntPage = () => {
    setPInterval((prevState) => prevState - 1);
  };
  return [
    nextPage,
    prevPage,
    pInterval,
    nextIntPage,
    prevIntPage,
    paginationToRender,
    projectData?.totalPages,
  ] as const;
};
