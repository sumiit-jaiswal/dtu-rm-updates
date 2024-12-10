import React, { useEffect, useState } from "react";
import "./style.scss";
import { fetchDataFromApi } from "../../api/api";
import Filter from "../filter";

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

const isExpired = (deadline) => {
  return new Date(deadline) < new Date();
};

const isNearbyDeadline = (deadline) => {
  const currentTime = new Date();
  const deadlineTime = new Date(deadline);
  const timeDifference = deadlineTime - currentTime;
  return timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCgpa, setSelectedCgpa] = useState("");
  const [loading, setLoading] = useState(true);
  const [showActiveJobs, setShowActiveJobs] = useState(false);

  useEffect(() => {
    getJobData();
  }, []);

  const getJobData = async () => {
    try {
      const res = await fetchDataFromApi(
        "https://dtu-rm-backend.vercel.app/api/jobdata"
      );
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleCgpaChange = (event) => {
    setSelectedCgpa(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const branchMatch = selectedBranch
      ? job.btechBranches.includes(parseInt(selectedBranch))
      : true;
    const cgpaMatch = selectedCgpa
      ? job.btechCutoff <= parseInt(selectedCgpa)
      : true;
    const activeJobsMatch = showActiveJobs
      ? !isExpired(job.applicationClosed)
      : true;
    return branchMatch && cgpaMatch && activeJobsMatch;
  });

  return (
    <div className="main-container">
      {!loading && (
        <div className="filters">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="showActiveJobs"
              checked={showActiveJobs}
              onChange={() => setShowActiveJobs(!showActiveJobs)}
            />
            <label htmlFor="showActiveJobs">
            Show Only Active Jobs
            </label>
          </div>

          <Filter
            onBranchChange={handleBranchChange}
            onCgpaChange={handleCgpaChange}
            branchMapping={branchMapping}
          />
        </div>
      )}
      <div className="job-container">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          filteredJobs.map((job, index) => {
            const deadlineClass = isExpired(job.applicationClosed)
              ? "expired-jobs"
              : isNearbyDeadline(job.applicationClosed)
              ? "nearby-deadline-jobs"
              : "active-jobs";

            return (
              <div className={`jobs ${deadlineClass}`} key={index}>
                <div className="heading">
                  <h1>{job.company.name}</h1>
                  <h3>{job.name}</h3>
                </div>
                <div className="desc">
                  <p className="desc-details red">
                    Deadline: {formatDate(job.applicationClosed)}
                    {isExpired(job.applicationClosed)
                      ? " ( Expired )"
                      : isNearbyDeadline(job.applicationClosed)
                      ? " ( Jaldi bhar de )"
                      : ""}
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
                    <div>Btech Branches Allowed : </div>
                    <div className="branches">
                      {job.btechBranches.map((branchId, branchIndex) => (
                        <span key={branchId}>
                          {branchMapping[branchId]}
                          {branchIndex < job.btechBranches.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Jobs;
