"use client";

import React from "react";
import { Job } from "@prisma/client"; // or from your own Job type definition

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>
        {job.title} @ {job.company}
      </h2>
      <p style={styles.location}>
        <strong>Location:</strong> {job.location}
      </p>
      {/* Display optional fields as desired */}
      <p>
        <strong>Work Arrangement:</strong> {job.workArrangement}
      </p>
      <p style={styles.description}>{job.description}</p>
      <a
        href={job.applyLink}
        style={styles.applyLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply Here
      </a>
    </div>
  );
};

export default JobCard;

// Example of a simple "solid color" card styling
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#f5f5f5", // Change this to any solid color you like
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)", // Adds a subtle shadow
  },
  title: {
    fontSize: "1.25rem",
    margin: 0,
    color: "#333",
  },
  location: {
    margin: "0.5rem 0",
    color: "#666",
  },
  description: {
    margin: "0.5rem 0",
    lineHeight: 1.4,
    color: "#333",
  },
  applyLink: {
    display: "inline-block",
    marginTop: "0.5rem",
    color: "#eb5e28",
    textDecoration: "none",
    fontWeight: "bold",
  },
};