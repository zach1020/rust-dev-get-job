// app/hire-now/success/ClientSuccess.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ClientSuccess() {
  const [message, setMessage] = useState("Verifying payment...");
  const [isPosting, setIsPosting] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // If no session ID found, show an error message
    if (!sessionId) {
      setMessage("No session found. Please go back or try again.");
      setIsPosting(false);
      return;
    }

    // Retrieve the session from Stripe to get metadata
    const verifyPaymentAndPostJob = async () => {
      try {
        // 1) GET the Stripe session from your custom route
        const getSessionRes = await fetch(`/api/retrieve-checkout-session?session_id=${sessionId}`);
        if (!getSessionRes.ok) {
          throw new Error("Failed to retrieve session from Stripe.");
        }

        const { jobMetadata } = await getSessionRes.json();
        if (!jobMetadata) {
          throw new Error("No jobMetadata found in the session.");
        }

        // 2) POST the job metadata to your DB via /api/jobs
        const postJobRes = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobMetadata),
        });
        if (!postJobRes.ok) {
          throw new Error("Failed to store the job in the database.");
        }

        // If everything went smoothly:
        setMessage("Your job has been posted successfully!");
      } catch (error: unknown) {
        // By default, TypeScript treats catch parameters as unknown in newer TS versions
        console.error("Error:", error);
      
        // Check if the error is an instance of the built-in Error
        if (error instanceof Error) {
          setMessage(`Payment verified, but an error occurred: ${error.message}`);
        } else {
          // Fall back if it's not an actual Error object
          setMessage("Payment verified, but an unknown error occurred.");
        }
      }
    };

    verifyPaymentAndPostJob();
  }, [sessionId]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div style={styles.container}>
      <h1>Payment Success</h1>
      <p style={styles.message}>{message}</p>

      {isPosting ? (
        <div style={styles.spinnerContainer}>
          <div style={styles.spinner}></div>
        </div>
      ) : (
        <button style={styles.button} onClick={handleGoHome}>
          Go to Homepage
        </button>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  message: {
    marginTop: "1rem",
    marginBottom: "2rem",
    fontSize: "1rem",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  spinner: {
    width: "24px",
    height: "24px",
    border: "3px solid #ccc",
    borderTop: "3px solid #403d39",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  button: {
    padding: "0.75rem 1.25rem",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: "#403d39",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

/* 
  Note: For the spinner animation to work in a pure CSS manner, 
  you can add a global CSS rule or a styled-jsx snippet:

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  If you're using Tailwind or another styling approach, 
  adapt the spinner code accordingly.
*/