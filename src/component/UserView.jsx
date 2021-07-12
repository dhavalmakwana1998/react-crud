import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link, useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import axios from "axios";
import packageJson from "../../package.json";
import { Box, Grid } from "@material-ui/core";
import Skeleton from "react-loading-skeleton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: "auto",
  },
  media: {
    height: 140,
  },
});

function UserView() {
  const [user, setUsers] = useState();
  const { id } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [confirmDeleteId, setConfirmdDeleteId] = useState(null);

  const deleteUser = async (id) => {
    setOpen(false);
    const res = await axios.delete(packageJson.apiUrl + id);
    setConfirmdDeleteId(null);
    history.push("/user");
  };

  const openConfirm = (deleteId) => {
    setConfirmdDeleteId(deleteId);
    setOpen(true);
  };

  useEffect(() => {
    const loadUser = async () => {
      const res = await axios.get(packageJson.apiUrl + id);
      const user = await res.data;
      setTimeout(() => {
        setUsers(user);
      }, 1000);
    };
    loadUser();
  }, []);

  const classes = useStyles();
  return (
    <>
      {user ? (
        <div className="container">
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle style={{ color: "red" }} id="alert-dialog-slide-title">
              {"Are you sure you want to delete this record?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                color="secondary"
                id="alert-dialog-slide-description"
              >
                Record will be deleted permanet..!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                color="primary"
              >
                Disagree
              </Button>
              <Button
                onClick={() => {
                  deleteUser(confirmDeleteId);
                }}
                color="secondary"
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          {user && (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/seed/picsum/700/500"
                  title="Contemplative Reptile"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {user.name} <span>•</span> {user.username}
                  </Typography>
                  <Typography gutterBottom variant="h6" color="error">
                    {user.email} <span>•</span> {user.website} <span>•</span>
                    {user.phone}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {user.city}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {user.bio}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to="/user">
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<ArrowBack />}
                  >
                    Back
                  </Button>
                </Link>
                <Link to="/user/add">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Link>
                <Link to={`/user/edit/` + user.id}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Edit />}
                    style={{ background: "#ff9800" }}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  style={{ marginLeft: "auto" }}
                  size="small"
                  variant="contained"
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => openConfirm(user.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          )}
        </div>
      ) : (
        <Box pt={0.5} className={classes.root}>
          <Skeleton variant="rect" width="100%" height={118} />
          <Skeleton variant="text" height={50} />
          <Skeleton variant="text" height={30} />
          <Grid container>
            <Grid item xs={2}>
              <Skeleton width="80%" height={30} />
            </Grid>

            <Grid item sm={2}></Grid>
            <Grid item sm={2}></Grid>
            <Grid item sm={2}>
              <Skeleton width="80%" height={30} alignItems="right" />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default UserView;
