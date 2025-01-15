// app/about/page.tsx
"use client";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import React from "react";

import "./page.css";

export default function AboutPage() {
  return (
    <div>
        <Header />
    <div style={styles.container}>
      <h1 style={styles.header}>About RustDevGetJob</h1>
      <div style={styles.content}>
        <p>
          RustDevGetJob.com was created out of a passion for the Rust programming language and a
          desire to help both developers and companies connect in the Rust ecosystem. We noticed
          that while Rust is becoming one of the most beloved programming languages, there wasn’t
          a dedicated platform focusing on Rust job opportunities.
        </p>
        <p>
          Here at RustDevGetJob, our mission is to:
        </p>
        <ul>
          <li>Showcase the best opportunities for Rust developers.</li>
          <li>Provide a simple and intuitive way for employers to post their Rust job listings.</li>
          <li>Help grow the Rust community by spreading awareness of exciting new projects.</li>
        </ul>
        <p>
          Whether you’re a seasoned Rustacean looking for your next challenge, or a company searching
          for top Rust talent, we hope our platform makes the process easier and more enjoyable.
        </p>
        <p>
          <strong>Thank you</strong> for visiting and being a part of the Rust community with us!
          If you have any questions, comments, or ideas, feel free to get in touch.
        </p>
      </div>
    </div>
    <div className="spacer" />
    <Footer />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "sans-serif",
    lineHeight: 1.6,
  },
  header: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#403d39",
  },
  content: {
    backgroundColor: "#fefefe",
    padding: "1.5rem",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontSize: "1rem",
    color: "#333",
  },
};