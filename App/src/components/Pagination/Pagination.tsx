import { usePagination } from "../../hooks/usePagination.ts";
import { ProjectsResponseInterface } from "../../interfaces";
import { Dispatch, SetStateAction, useEffect } from "react";
import classes from "./Pagination.module.scss";

interface Props {
  responseObj: ProjectsResponseInterface | undefined;
  setCurPage: Dispatch<SetStateAction<number>>;
  curPage: number;
}

const Pagination = ({ responseObj, setCurPage, curPage }: Props) => {
  const [
    nextPage,
    prevPage,
    pInterval,
    nextIntPage,
    prevIntPage,
    paginationToRender,
  ] = usePagination(responseObj, setCurPage);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [curPage]);
  return (
    <div className={classes.pagination}>
      <button onClick={prevPage}>Prev</button>
      {pInterval > 0 && <button onClick={prevIntPage}>...</button>}
      {paginationToRender.map((pageNumber) => (
        <button
          onClick={() => setCurPage(pageNumber - 1)}
          className={curPage + 1 === pageNumber ? classes.activeButton : classes.button}
          key={pageNumber}
        >
          {pageNumber}
        </button>
      ))}
      {responseObj?.totalPages !==
        paginationToRender[paginationToRender.length - 1] && (
        <button onClick={nextIntPage}>...</button>
      )}
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Pagination;
