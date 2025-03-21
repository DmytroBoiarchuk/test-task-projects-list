import React, { JSX, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./ErrorModal.module.scss";
import { GrClose } from "react-icons/gr";

interface Props {
  modalIsShown: boolean;
  children: React.ReactElement;
  setModalIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}
const ErrorModal = ({
  children,
  modalIsShown,
  setModalIsShown,
}: Props): JSX.Element => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    if (
      backdropRef.current &&
      !backdropRef.current.contains(e.target as Element)
    ) {
      setModalIsShown(false);
    }
  }

  // block scroll while modal is shown
  useEffect(() => {
    if (modalIsShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIsShown]);
  return ReactDOM.createPortal(
    <>
      {modalIsShown && (
        <div onClick={handleClickOutside} className={classes.modalBackDrop}>
          <div ref={backdropRef} className={classes.modalWrapper}>
            <button
              className={classes.closeButton}
              onClick={() => setModalIsShown(false)}
            >
              <GrClose />
            </button>

            <div className={classes.modalBody}>
              <h1>Error: </h1>

              {children}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

export default ErrorModal;
