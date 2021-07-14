import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SkeletonTable from "../skeleton/SkeletonTable";
import {
  TablePagination,
  Box,
  IconButton,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import packageJson from "../../package.json";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function User() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteId, setConfirmdDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const loadUser = async () => {
    const res = await axios.get(packageJson.apiUrl);
    const user = res.data.reverse();
    setTimeout(() => {
      setUsers(user);
    }, 2000);
  };

  const deleteUser = async (id) => {
    setOpen(false);
    const res = await axios.delete(packageJson.apiUrl + id);
    setConfirmdDeleteId(null);
    setUsers([]);
    loadUser();
  };

  const openConfirm = (deleteId) => {
    setConfirmdDeleteId(deleteId);
    setOpen(true);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const classes = useStyles();
  return (
    <>
      {users.length ? (
        <>
          <Grid container>
            <Grid container spacing={3} style={{ marginBottom: "6px" }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h4">Users</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box align="right">
                  <Link to="/user/add">
                    <Button
                      color="secondary"
                      variant="contained"
                      startIcon={<AddIcon />}
                    >
                      Add User
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
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
              <DialogTitle
                style={{ color: "red" }}
                id="alert-dialog-slide-title"
              >
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
            {/* <Box marginBottom={2} align="right">
        <TextField
          size="small"
          onChange={handleSearch}
          label="Search by name"
          variant="outlined"
          color="primary"
          value={searchText}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => loadUser}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box> */}
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">#ID</StyledTableCell>
                    <StyledTableCell>Full Name</StyledTableCell>
                    <StyledTableCell>Userame</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>City</StyledTableCell>
                    <StyledTableCell>Zipcode</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!users.length ? (
                    <TableRow>
                      <TableCell rowSpan={7}>No records found</TableCell>
                    </TableRow>
                  ) : (
                    users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, ind) => (
                        <TableRow key={ind + 1}>
                          <TableCell align="center" component="th" scope="row">
                            {ind + 1}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.city}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>
                            <IconButton>
                              <Link to={`/user/${row.id}`}>
                                <VisibilityIcon color="primary" />
                              </Link>
                            </IconButton>
                            <IconButton>
                              <Link to={`/user/edit/${row.id}`}>
                                <Edit style={{ color: "#ff9800" }} />
                              </Link>
                            </IconButton>
                            <IconButton onClick={() => openConfirm(row.id)}>
                              <Delete color="secondary" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                  {!users.length ? (
                    <></>
                  ) : (
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[3, 5, 7, 10, 15, 20]}
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      ) : (
        <SkeletonTable />
      )}
    </>
  );
}

export default User;
