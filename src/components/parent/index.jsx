import React, { useState, useEffect } from "react";
import Header from "../header";
import Jobs from "../jobs";
import { fetchDataFromApi } from "../../api/api";

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
const JobFilter = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
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

    getJobData();
  }, []);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const filteredJobs = selectedBranch
    ? jobs.filter((job) => job.btechBranches.includes(parseInt(selectedBranch)))
    : jobs;

  return (
    <div>
      <Header
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
      />
      <Jobs jobs={filteredJobs} />
    </div>
  );
};

export default JobFilter;
