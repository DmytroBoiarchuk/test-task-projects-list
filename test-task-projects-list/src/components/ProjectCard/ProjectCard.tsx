import { ProjectInterface } from "../../interfaces";
import classes from "./ProjectCard.module.scss";
import { useState } from "react";
import { FaBed, FaBath } from "react-icons/fa6";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { TbMeterSquare } from "react-icons/tb";
import { LiaMapMarkerSolid } from "react-icons/lia";
import * as React from "react";
import { useMedia } from "../../hooks/useMedia.ts";

interface Props {
  project: ProjectInterface;
}
const ProjectCard = ({ project }: Props) => {
  const lessThen768 = useMedia("(max-width: 768px)");

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [arrowIsVisible, setArrowIsVisible] = useState<boolean>(false);
  const nextImage = () => {
    setCurrentImage((prevImage) =>
      project.images.length - 1 !== prevImage ? prevImage + 1 : 0,
    );
  };
  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? project.images.length - 1 : prevImage - 1,
    );
  };
  const toggleArrows = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setArrowIsVisible((prevState) => !prevState);
  };
  return (
    <li className={classes.card} key={project._id}>
      <div>
        <div
          className={classes.imageBox}
          onMouseEnter={toggleArrows}
          onMouseLeave={toggleArrows}
        >
          <img
            className={classes.image}
            src={project.images[currentImage].original}
            alt={project._id}
          />
          <button
            onClick={prevImage}
            className={`${classes.buttonLeft} ${!lessThen768 ? arrowIsVisible || classes.hidden : ""}`}
          >
            <FaArrowCircleLeft size={25} />
          </button>
          <button
            onClick={nextImage}
            className={`${classes.buttonRight} ${!lessThen768 ? arrowIsVisible || classes.hidden : ""}`}
          >
            <FaArrowCircleRight size={25} />
          </button>
        </div>
        <div className={classes.infoBlock}>
          <div className={classes.nameAndPriceBlock}>
            <p>{project.generalInfo.name}</p>
            <p className={classes.price}>${project.generalInfo.price}</p>
          </div>

          <span>
            <LiaMapMarkerSolid size={25} />
            {project.generalInfo.province}
          </span>
          <div className={classes.parametersBlock}>
            <span>
              <FaBed />
              {project.generalInfo.rooms} Beds
            </span>
            <span>{" | "}</span>
            <span>
              <FaBath />
              {project.generalInfo.bathrooms} Baths
            </span>
            <span>{" | "}</span>
            <span>
              <TbMeterSquare />
              {project.generalInfo.size} sqft
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
