import React from "react";
import "./style.scss";

const Filter = ({
  onBtechBranchChange,
  onMtechBranchChange,
  onCourseChange,
  onCgpaChange,
  btechBranchMapping = {},
  mtechBranchMapping = {},
  selectedCourse
}) => {
  return (
    <div className="filter">
      <div className="nav-bar">
        <div className="heading">Filter by:</div>
        
        <div className="drop-down">
          <select
            name="course"
            id="course"
            className="filter-values"
            onChange={onCourseChange}
          >
            <option value="all">All Courses</option>
            <option value="btech">BTech</option>
            <option value="mtech">MTech</option>
          </select>
        </div>

        {(selectedCourse === "all" || selectedCourse === "btech") && (
          <div className="drop-down">
            <select
              name="btechBranch"
              id="btechBranch"
              className="filter-values"
              onChange={onBtechBranchChange}
            >
              <option value="">BTech Branch (All)</option>
              {Object.entries(btechBranchMapping).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        )}

        {(selectedCourse === "all" || selectedCourse === "mtech") && (
          <div className="drop-down">
            <select
              name="mtechBranch"
              id="mtechBranch"
              className="filter-values"
              onChange={onMtechBranchChange}
            >
              <option value="">MTech Branch (All)</option>
              {Object.entries(mtechBranchMapping).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="drop-down">
          <select
            name="cgpa"
            id="cgpa"
            className="filter-values"
            onChange={onCgpaChange}
          >
            <option value="">Cutoff (All)</option>
            <option value="9.5">9.5</option>
            <option value="9">9</option>
            <option value="8.5">8.5</option>
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