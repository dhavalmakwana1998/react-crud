import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Container from "@material-ui/core/Container";
import axios from "axios";
import packageJson from "../../package.json";
import Skeleton from "react-loading-skeleton";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function UserAdd() {
  const [users, setUsers] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    bio: "",
  });
  const history = useHistory();
  const classes = useStyles();

  const onInputChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    setUsers({ ...users, [eventName]: eventValue });
  };
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    const res = await axios.post(packageJson.apiUrl, users);
    history.push("/user");
  };
  return (
    <>
      <div className="container">
        <Grid container spacing={3} style={{ marginBottom: "6px" }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Add User</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box align="right">
              <Link to={"/user"}>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Container maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            <Typography>User Add</Typography>
            <form className={classes.form} onSubmit={onSubmitHandle}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    value={users.name}
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    onChange={onInputChange}
                    label="Full Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={users.username}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={users.email}
                    onChange={onInputChange}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    value={users.phone}
                    onChange={onInputChange}
                    label="Phone number"
                    id="phone"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="website"
                    value={users.website}
                    onChange={onInputChange}
                    label="Website"
                    id="website"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="city"
                    value={users.city}
                    onChange={onInputChange}
                    label="City"
                    id="city"
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    id="bio"
                    label="Bio"
                    multiline
                    required
                    fullWidth
                    name="bio"
                    rows={3}
                    variant="outlined"
                    value={users.bio}
                    onChange={onInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default UserAdd;
