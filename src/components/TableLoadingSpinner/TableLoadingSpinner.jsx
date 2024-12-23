import { CircularProgress, TableCell, TableRow } from "@mui/material";
import React from "react";
import { colors } from "../../assets";

function TableLoadingSpinner({ noOfCols }) {
  return (
    <TableRow>
      <TableCell colSpan={noOfCols || 10}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress
            sx={{
              margin: "20px auto",
              color: colors.primary,
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableLoadingSpinner;
