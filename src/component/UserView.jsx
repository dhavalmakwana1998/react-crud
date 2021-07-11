import { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useParams, Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  const loadUser = async () => {
    const res = await fetch(`http://localhost:3001/userdb/${id}`);
    setUsers(await res.json());
  };

  useEffect(() => {
    loadUser();
  }, []);

  const classes = useStyles();
  return (
    <>
      <div className="container">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://picsum.photos/seed/picsum/700/500"
              title="Contemplative Reptile"
            />
            {user && (
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {user.name} <span>•</span> {user.username}
                </Typography>
                <Typography gutterBottom variant="h6" color="error">
                  {user.email} <span>•</span> {user.website}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {user.company.catchPhrase}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.address.street}
                  {user.address.suite}
                  {user.address.city}
                </Typography>
              </CardContent>
            )}
          </CardActionArea>
          <CardActions>
            <Link to="/user">
              <Button size="small" variant="contained" color="primary">
                Back
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </>
  );
}

export default UserView;
