"use client";

import React, { useState } from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function HireNowPage() {
  // Form fields
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [workArrangement, setWorkArrangement] = useState<"Remote" | "Hybrid" | "In-person">("Remote");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      // 1) Call our new checkout session API route
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          company,
          location,
          description,
          applyLink,
          jobType,
          experienceLevel,
          salaryRange,
          workArrangement,
        }),
      });

      if (!res.ok) {
        throw new Error("Error creating Stripe Checkout session");
      }

      const data = await res.json();
      if (!data.url) {
        throw new Error("No Stripe session URL returned");
      }

      // 2) Redirect user to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Error initiating Stripe checkout:", error);
      setMessage("Payment initiation failed. Please try again.");
    }
  };

// ... styles object unchanged ...

return (
    <div>
        <Header />
    <div style={styles.pageWrapper}>
      <h1 style={styles.pageTitle}>Post a New Job</h1>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Job Title
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              placeholder="e.g. Senior Rust Developer"
            />
          </label>

          <label style={styles.label}>
            Company
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={styles.input}
              placeholder="e.g. Acme Inc."
            />
          </label>

          <label style={styles.label}>
            Location
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.input}
              placeholder="e.g. New York, Remote, etc."
            />
          </label>

          <label style={styles.label}>
            Description
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              placeholder="Briefly describe the role..."
            />
          </label>

          <label style={styles.label}>
            Apply Link
            <input
              type="url"
              required
              value={applyLink}
              onChange={(e) => setApplyLink(e.target.value)}
              style={styles.input}
              placeholder="https://..."
            />
          </label>

          <label style={styles.label}>
            Job Type
            <input
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              style={styles.input}
              placeholder="Full-time, Part-time, Contract, etc."
            />
          </label>

          <label style={styles.label}>
            Experience Level
            <input
              type="text"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              style={styles.input}
              placeholder="Junior, Mid-level, Senior, etc."
            />
          </label>

          <label style={styles.label}>
            Salary Range
            <input
              type="text"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              style={styles.input}
              placeholder="$80k-$100k"
            />
          </label>

          <div style={styles.radioGroup}>
            <span style={styles.radioGroupLabel}>Work Arrangement:</span>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="workArrangement"
                value="Remote"
                checked={workArrangement === "Remote"}
                onChange={(e) => setWorkArrangement(e.target.value as "Remote")}
              />
              Remote
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="workArrangement"
                value="Hybrid"
                checked={workArrangement === "Hybrid"}
                onChange={(e) => setWorkArrangement(e.target.value as "Hybrid")}
              />
              Hybrid
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="workArrangement"
                value="In-person"
                checked={workArrangement === "In-person"}
                onChange={(e) => setWorkArrangement(e.target.value as "In-person")}
              />
              In-person
            </label>
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit & Pay
          </button>
          {message && <p style={styles.feedback}>{message}</p>}
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  pageTitle: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
    color: "#333",
  },
  formCard: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: 500,
    color: "#333",
    fontSize: "0.95rem",
    marginBottom: "0.25rem",
  },
  input: {
    padding: "0.5rem",
    marginTop: "0.25rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.95rem",
  },
  textarea: {
    padding: "0.5rem",
    marginTop: "0.25rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.95rem",
    resize: "vertical",
    minHeight: "80px",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  radioGroupLabel: {
    fontWeight: 500,
    color: "#333",
    marginBottom: "0.25rem",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "0.95rem",
  },
  submitButton: {
    padding: "0.75rem 1.25rem",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: "#eb5e28",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  feedback: {
    marginTop: "1rem",
    fontSize: "0.95rem",
    color: "green",
  },
};