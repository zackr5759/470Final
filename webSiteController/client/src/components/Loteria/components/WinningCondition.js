import React, { useState } from "react";
import { Box } from "@mui/material";

export default function WinningCondition() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option value="Select:">Select:</option>
        <option value="Any row">Any Row</option>
        <option value="Any column">Any column</option>
        <option value="Any 4 corners">Any 4 corners</option>
        <option value="Diagonally">Diagonally</option>
        <option value="Full Card">Full card</option>
      </select>
      <Box sx={{ mx: "auto", justifyContent: "center", width: "30%" }}>
        <h3
          style={{
            color: "white",
            backgroundColor: "green",
            borderRadius: "15%",
          }}
        >{`Winning condition set to: ${value}`}</h3>
      </Box>
    </div>
  );
}
