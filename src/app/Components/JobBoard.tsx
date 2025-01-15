"use client";

import React, { useEffect, useState } from "react";
import { Job } from "@prisma/client"; // or import your Job type from a separate file
import JobCard from "./JobCard"; // Adjust path if needed

const JobBoard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Rust Developer Jobs</h1>
      <ul style={styles.jobList}>
        {jobs.map((job) => (
          // Remove default bullet & spacing if desired
          <li key={job.id} style={{ listStyleType: "none" }}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobBoard;

// Keep or adjust your existing styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  header: {
    marginBottom: "1.5rem",
    fontSize: "2rem",
    textAlign: "center",
  },
  jobList: {
    listStyleType: "none",
    paddingLeft: 0,
  },
};