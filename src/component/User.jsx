import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  TablePagination,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ViewUser from "./UserView";

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
  const [searchText, setSearchText] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadUser = async () => {
    const res = await fetch("http://localhost:3001/userdb");
    setUsers(await res.json());
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

  // function handleSearch(e) {
  //   setSearchText(e.target.value);
  //   const filtered = users.filter((row) => {
  //     return row.name.includes(searchText);
  //   });
  //   setUsers(filtered);
  // }

  const classes = useStyles();
  return (
    <>
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
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Zipcode</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!users ? (
              <h5>no records found</h5>
            ) : (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center" component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>
                      {row.name} {row.surname}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.address.city}</TableCell>
                    <TableCell>{row.address.zipcode}</TableCell>
                    <TableCell>
                      <IconButton>
                        <Link to={`/user/${row.id}`}>
                          <VisibilityIcon color="primary" />
                        </Link>
                      </IconButton>
                      <IconButton>
                        <Edit style={{ color: "#ff9800" }} />
                      </IconButton>
                      <IconButton>
                        <Delete color="secondary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
            <TablePagination
              rowsPerPageOptions={[3, 5, 7, 10, 15, 20]}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default User;
