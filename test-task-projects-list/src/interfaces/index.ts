export interface ProjectInterface {
  _id: string;
  images: { large: string; medium: string; original: string; small: string }[];
  generalInfo: {
    bathrooms: number;
    coordinates: { latitude: string; longitude: string };
    living_area: number;
    name: string;
    price: number;
    province: string;
    reference: string;
    rooms: string;
    size: number;
    terrace: number;
    type: string;
  };
}
export interface ProjectsResponseInterface {
  currentPage: number;
  projects: ProjectInterface[];
  totalObjects: number;
  totalPages: number;
}
