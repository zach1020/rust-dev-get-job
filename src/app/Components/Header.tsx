import Link from "next/link";
import * as React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import "./Header.css";

export default function Header() {
  return (
    <div className="headerClass">
      <div className="flexRow">
        <Link href="/" style={{textDecoration: "none"}}>
        <Typography sx={{ fontWeight: "bold" }} color="#403d39" variant="h5" gutterBottom>
          RustDevFindJob.com
        </Typography>
        </Link>
        <div className="flexRow">
          {/* Link to the /about page */}
          <Link href="/about" style={{ textDecoration: "none" }}>
            <Button
              sx={{ color: "#fffcf2", borderColor: "#fffcf2" }}
              variant="outlined"
            >
              About
            </Button>
          </Link>

          {/* Hire Now button */}
          <Link href="/hire-now" style={{ textDecoration: "none" }}>
            <Button
              sx={{ color: "#fffcf2", backgroundColor: "#403d39" }}
              variant="contained"
            >
              Hire Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}