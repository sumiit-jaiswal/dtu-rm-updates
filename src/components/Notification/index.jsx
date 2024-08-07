import React from "react";
import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../../api/api";

import "./style.scss";

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

const Notification = () => {
  const [noti, setNoti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotiData();
  }, []);

  const getNotiData = async () => {
    try {
      const res = await fetchDataFromApi(
        "https://dtu-rm-backend.vercel.app/api/jobnotification"
      );
      setNoti(res.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notifications">
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        noti?.map((noti, index) => (
          <div className="notification" key={index}>
            <div className="heading">
              <h1>{noti.company.name}</h1>
            </div>
            <div className="desc">
              <p className="desc-details">{noti.postData}</p>
              <p className="desc-details">
                Posted on: {formatDate(noti.createdAt)}
              </p>
              <p className="desc-details">contact: {noti.postedBy.email}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
