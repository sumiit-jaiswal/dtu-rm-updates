import React from "react";
import "./style.scss";

// Default empty mapping to prevent errors
const defaultBranchMapping = {};

const Header = ({ onBranchChange, branchMapping = defaultBranchMapping }) => {
  return (
    <div className="header">
      <div className="nav-bar">
        <p className="heading">Filter by:</p>
        <div className="drop-down">
          <select
            name="branch"
            id="branch"
            className="filter-branch"
            onChange={onBranchChange}
          >
            <option value="">---choose Your branch---</option>
            {Object.entries(branchMapping).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
