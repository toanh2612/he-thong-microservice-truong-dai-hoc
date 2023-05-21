import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, Button } from "@mui/material";
import { Theme } from "@/lib";

export interface ILoading {
  open: boolean;
}

export default function Loading({ open }: ILoading) {
  return (
    <div>
      <Backdrop
        // className={styles.background}
        style={{
          background: "#b2b2b2",
          width: "auto",
          height: "auto",
        }}
        sx={{ color: "black", zIndex: 100000 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
