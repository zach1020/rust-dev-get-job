// Footer.tsx
import React from "react";

interface SocialLink {
  name: string;
  url: string;
}

interface NavLink {
  label: string;
  url: string;
}

const socialLinks: SocialLink[] = [
  { name: "Twitter", url: "https://x.com/Elroy_Muscato" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/zachary-bohl-2092581ab/" },
  { name: "GitHub", url: "https://github.com/zach1020" },
];

const navLinks: NavLink[] = [
  { label: "About", url: "/about" },
  { label: "Contact", url: "/contact" },
];

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.navSection}>
          <ul style={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.label} style={styles.navItem}>
                <a href={link.url} style={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.socialSection}>
          <span style={styles.socialLabel}>Follow us:</span>
          <ul style={styles.socialList}>
            {socialLinks.map((social) => (
              <li key={social.name} style={styles.socialItem}>
                <a href={social.url} style={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.copyRight}>
          © 2025 <strong>RustDevGetJob.com</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Inline styles for illustration purposes.
// Replace or modify with your preferred styling approach (e.g., CSS modules, styled-components, etc.).
const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: "#f5f5f5",
    padding: "1.5rem 0",
    marginTop: "2rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navSection: {
    marginBottom: "1rem",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    gap: "1rem",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: 0,
  },
  navLink: {
    color: "#333",
    textDecoration: "none",
    fontWeight: 500,
  },
  socialSection: {
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  socialLabel: {
    fontWeight: 500,
  },
  socialList: {
    listStyleType: "none",
    display: "flex",
    gap: "1rem",
    margin: 0,
    padding: 0,
  },
  socialItem: {
    margin: 0,
  },
  socialLink: {
    color: "#333",
    textDecoration: "none",
  },
  copyRight: {
    fontSize: "0.9rem",
    color: "#888",
  },
};