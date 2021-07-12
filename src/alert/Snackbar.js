import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  var { open, message } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    open = false;
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <MuiAlert elevation={3} severity="success" variant="filled">
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
