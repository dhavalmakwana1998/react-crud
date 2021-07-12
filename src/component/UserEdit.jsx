import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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

function UserEdit() {
  const [users, setUsers] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    bio: "",
  });
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const onInputChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    setUsers({ ...users, [eventName]: eventValue });
  };
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    await fetch(
      `https://my-json-server.typicode.com/dhavalmakwana1998/crud/users${id}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      }
    ).then(async (res) => {
      history.push("/");
    });
  };

  useEffect(() => {
    const loadData = async (id) => {
      const res = await fetch(
        `https://my-json-server.typicode.com/dhavalmakwana1998/crud/users${id}`
      );
      setUsers(await res.json());
    };
    loadData(id);
  }, []);
  return (
    <>
      <div className="container">
        <Grid container spacing={3} style={{ marginBottom: "6px" }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Edit User</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box align="right">
              <Link to="/">
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
                style={{ backgroundColor: "#ff9800" }}
                className={classes.submit}
              >
                Update
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default UserEdit;
