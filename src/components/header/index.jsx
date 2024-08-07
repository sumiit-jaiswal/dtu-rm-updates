import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div
        onClick={() => {
          navigate("/jobs");
        }}
        className={`header-left ${
          location.pathname === "/jobs" || location.pathname === "/"
            ? "active"
            : ""
        }`}
      >
        Jobs
      </div>
      <div
        onClick={() => {
          navigate("/notifications");
        }}
        className={`header-right ${
          location.pathname === "/notifications" ? "active" : ""
        }`}
      >
        Notifications
      </div>
    </div>
  );
};

export default Header;
