import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

export default function AlertMessage(props) {
  const { open } = props;
  const toast = { vertical: "top", horizontal: "right" };
  const { vertical, horizontal } = toast;
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </div>
  );
}
