import {useEffect, useState} from "react";
import {ProjectsResponseInterface} from "../interfaces";
import {getProjects} from "../api";

export const useProjects = (page: number) => {
    const [curPage, setCurPage] = useState(page);
    const [response, setResponse] = useState<ProjectsResponseInterface>();
    useEffect(() => {
        getProjects(curPage).then((res) => {
            setResponse(res);
        });
    }, [curPage]);
    return [response,curPage, setCurPage] as const;
};

