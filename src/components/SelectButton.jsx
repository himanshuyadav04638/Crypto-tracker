import React from "react";
import "./SelectButton.css";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`select-button ${selected ? "selected" : ""}`}
    >
      {children}
    </button>
  );
};

export default SelectButton;
