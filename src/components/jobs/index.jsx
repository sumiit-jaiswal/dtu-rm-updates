import React, { useEffect, useState } from "react";
import "./style.scss";
import { fetchDataFromApi } from "../../api/api";
import Header from "../header";

const formatDate = (dateString) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date(dateString).toLocaleString("en-GB", options);
};

const branchMapping = {
  0: "AE",
  1: "BTE",
  2: "CHE",
  3: "CE",
  4: "COE",
  5: "ECE",
  6: "EE",
  7: "ENE",
  8: "EP",
  9: "IT",
  10: "MCE",
  11: "ME",
  12: "PSCT",
  13: "PIE",
  14: "SE",
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    getJobData();
  }, []);

  const getJobData = async () => {
    try {
      const res = await fetchDataFromApi(
        "https://rm.dtu.ac.in/api/company/jobPost?page=1"
      );
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const filteredJobs = selectedBranch
    ? jobs.filter((job) => job.btechBranches.includes(parseInt(selectedBranch)))
    : jobs; // If no branch is selected, show all jobs

  return (
    <div>
      <Header
        onBranchChange={handleBranchChange}
        branchMapping={branchMapping}
      />
      <div className="job-container">
        {filteredJobs.map((job, index) => (
          <div className="jobs" key={index}>
            <div className="heading">
              <h1>{job.company.name}</h1>
              <h3>{job.name}</h3>
            </div>
            <div className="desc">
              <p className="desc-details red">
                Deadline: {formatDate(job.applicationClosed)}
              </p>
              <p className="desc-details">
                Posted on: {formatDate(job.applicationOpen)}
              </p>
              <p className="desc-details">
                CTC: {job.ctc} {job.ctc < 100 ? "LPA" : " "}
              </p>
              <p className="desc-details">Cutoff: {job.btechCutoff}</p>
              <p className="desc-details">
                Job Description:{" "}
                <a
                  href={job.jobDescription}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link
                </a>
              </p>
              <div className="branches-allowed">
                <div>Branches Allowed :</div>
                <div className="drop-down">
                  <select
                    name="branch"
                    id="branch-allowed"
                    className="filter-branch"
                  >
                    {job.btechBranches.map((branchId) => (
                      <option key={branchId} value={branchId}>
                        {branchMapping[branchId]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
