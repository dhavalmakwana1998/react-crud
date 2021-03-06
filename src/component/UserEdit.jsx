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
import axios from "axios";
import packageJson from "../../package.json";
import SkeletonForm from "../skeleton/SkeletonForm";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
    await axios.put(packageJson.apiUrl + id, users);
    history.push("/user");
  };
  useEffect(() => {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isNaN", (value) => {
      if (isNaN(value)) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isNum", (value) => {
      if (isNaN(value)) {
        return true;
      }
      return false;
    });
    ValidatorForm.addValidationRule("numLimit", (value) => {
      if (value.length < 10 || value.length > 10) {
        return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("isNaN");
      ValidatorForm.removeValidationRule("isNum");
      ValidatorForm.removeValidationRule("numLimit");
    };
  }, []);

  useEffect(() => {
    const loadData = async (id) => {
      const res = await axios.get(packageJson.apiUrl + id);
      setUsers(res.data);
    };
    loadData(id);
  }, []);
  return (
    <>
      {users ? (
        <div className="container">
          <Grid container spacing={3} style={{ marginBottom: "6px" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">Edit User</Typography>
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
              <ValidatorForm onSubmit={onSubmitHandle}>
                {/* <form className={classes.form} onSubmit={onSubmitHandle}> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
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
                    <TextValidator
                      variant="outlined"
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      value={users.username}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      variant="outlined"
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "This field is required",
                        "email is not valid'",
                      ]}
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
                    <TextValidator
                      variant="outlined"
                      validators={["required", "isNaN", "numLimit"]}
                      errorMessages={[
                        "This field is required",
                        "Please enter number",
                        "Number must be 10 character",
                      ]}
                      fullWidth
                      name="phone"
                      value={users.phone}
                      onChange={onInputChange}
                      label="Phone number"
                      id="phone"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      variant="outlined"
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      fullWidth
                      name="website"
                      value={users.website}
                      onChange={onInputChange}
                      label="Website"
                      id="website"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      variant="outlined"
                      validators={["required", "isNum"]}
                      errorMessages={[
                        "This field is required",
                        "Please enter valid data",
                      ]}
                      fullWidth
                      name="city"
                      value={users.city}
                      onChange={onInputChange}
                      label="City"
                      id="city"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <TextValidator
                      id="bio"
                      label="Bio"
                      multiline
                      fullWidth
                      name="bio"
                      rows={3}
                      variant="outlined"
                      value={users.bio}
                      onChange={onInputChange}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
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
                {/* </form> */}
              </ValidatorForm>
            </div>
          </Container>
        </div>
      ) : (
        <SkeletonForm />
      )}
    </>
  );
}

export default UserEdit;
