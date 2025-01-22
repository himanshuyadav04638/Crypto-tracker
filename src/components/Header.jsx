import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          style={{ color: "yellow", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          CryptoTracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
