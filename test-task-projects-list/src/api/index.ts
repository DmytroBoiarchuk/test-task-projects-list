import {ProjectsResponseInterface} from "../interfaces";

export const getProjects = async (page: number): Promise<ProjectsResponseInterface> => {
    const url =
        `https://crm.server.pro-part.es/api/v1/secondary-projects/integration/projects?accessKey=A7gjfjj0WdBynt8d&secretKey=tGH5UlZcgNtAPrfq9MnmMhWji9j5vYXn&isPagination=true&size=30&page=${page}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
};
