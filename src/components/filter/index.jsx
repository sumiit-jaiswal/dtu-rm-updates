import React from "react";
import "./style.scss";

const defaultBranchMapping = {};

const Filter = ({
  onBranchChange,
  onCgpaChange,
  branchMapping = defaultBranchMapping,
}) => {
  return (
    <div className="filter">
      <div className="nav-bar">
        <div className="heading">Filter by:</div>
        <div className="drop-down">
          <select
            name="branch"
            id="branch"
            className="filter-values"
            onChange={onBranchChange}
          >
            <option value="">Branch (All)</option>
            {Object.entries(branchMapping).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="drop-down">
          <select
            name="cgpa"
            id="cgpa"
            className="filter-values"
            onChange={onCgpaChange}
          >
            <option value="">Cutoff (All)</option>
            <option value="9.5">9.5</option>
            <option value="9"> 9</option>
            <option value="8.5"> 8.5</option>
            <option value="8">8</option>
            <option value="7.5">7.5</option>
            <option value="7">7</option>
            <option value="6.5">6.5</option>
            <option value="6">6</option>
            <option value="5.5">5.5</option>
            <option value="5">5</option>
            <option value="4">or kitna girega</option>
          </select>
        </div>
      </div>
      <div className="about">
        <p>
          Developed by: <span className="developer-name">wizardaddy</span>
        </p>

        <p>For any query or bug email me on:</p>
        <p>iamwizardaddy@gmail.com</p>
      </div>
    </div>
  );
};

export default Filter;
