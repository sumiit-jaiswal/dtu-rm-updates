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

const btechBranchMapping = {
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

const mtechBranchMapping = {
  0: "PTE",
  1: "NST",
  2: "BIO",
  3: "GTE",
  4: "HRE",
  5: "STE",
  6: "GINF",
  7: "CSE",
  8: "SWE",
  9: "ITY",
  10: "MOC",
  11: "SPD",
  12: "VLS",
  13: "C&I",
  14: "PSY",
  15: "PES",
  16: "ENE",
  17: "PRD",
  18: "THE",
  19: "IBT",
  20: "AFI",
  21: "DSC",
  22: "IEM",
  23: "CAD",
};

const isExpired = (deadline) => {
  return new Date(deadline) < new Date();
};

const isNearbyDeadline = (deadline) => {
  const currentTime = new Date();
  const deadlineTime = new Date(deadline);
  const timeDifference = deadlineTime - currentTime;
  return timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000;
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedBtechBranch, setSelectedBtechBranch] = useState("");
  const [selectedMtechBranch, setSelectedMtechBranch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
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

  const handleBtechBranchChange = (event) => {
    setSelectedBtechBranch(event.target.value);
    setSelectedMtechBranch("");
  };

  const handleMtechBranchChange = (event) => {
    setSelectedMtechBranch(event.target.value);
    setSelectedBtechBranch("");
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedBtechBranch("");
    setSelectedMtechBranch("");
  };

  const handleCgpaChange = (event) => {
    setSelectedCgpa(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const branchMatch = (() => {
      if (selectedCourse === "btech" || selectedBtechBranch) {
        return selectedBtechBranch
          ? job.btechBranches.includes(parseInt(selectedBtechBranch))
          : true;
      } else if (selectedCourse === "mtech" || selectedMtechBranch) {
        return selectedMtechBranch
          ? job.mtechBranches?.includes(parseInt(selectedMtechBranch))
          : true;
      }
      return true;
    })();

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
            <label htmlFor="showActiveJobs">Show Only Active Jobs</label>
          </div>

          <Filter
            onBtechBranchChange={handleBtechBranchChange}
            onMtechBranchChange={handleMtechBranchChange}
            onCourseChange={handleCourseChange}
            onCgpaChange={handleCgpaChange}
            btechBranchMapping={btechBranchMapping}
            mtechBranchMapping={mtechBranchMapping}
            selectedCourse={selectedCourse}
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
                  {job.btechBranches && job.btechBranches.length > 0 && (
                    <div className="branches-allowed">
                      <div>BTech Branches Allowed : </div>
                      <div className="branches">
                        {job.btechBranches.map((branchId, branchIndex) => (
                          <span key={branchId}>
                            {btechBranchMapping[branchId]}
                            {branchIndex < job.btechBranches.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="branches-allowed">
                    <div>MTech Branches Allowed : </div>
                    <div className="branches">
                      {job.mtechBranches && job.mtechBranches.length > 0 ? (
                        job.mtechBranches.map((branchId, branchIndex) => (
                          <span key={branchId}>
                            {mtechBranchMapping[branchId]}
                            {branchIndex < job.mtechBranches.length - 1 && ", "}
                          </span>
                        ))
                      ) : (
                        <span>Not Allowed</span>
                      )}
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