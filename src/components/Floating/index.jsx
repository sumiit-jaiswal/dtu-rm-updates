import React from "react";

import "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Floating = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-buttons">
      <a
        href="https://rm.dtu.ac.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button link-button"
      >
        DTU RM
      </a>
      <div className="floating-button scroll-button" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </div>
    </div>
  );
};

export default Floating;
