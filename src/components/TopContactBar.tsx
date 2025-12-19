import React from "react";

export default function TopContactBar() {
  return (
    <div style={{
      background: "#002147",
      color: "#fff",
      fontSize: "0.95rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.3rem 2rem"
    }}>
      <div>
        <span style={{ marginRight: "1.5rem" }}>+971 58 201 2073</span>
        <span>sales@saamcabins.com</span>
      </div>
      <div>
        Saturday - Thursday: 9:00 - 19:00 / Closed on Weekends
      </div>
    </div>
  );
}
