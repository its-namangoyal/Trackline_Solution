import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Page from "../../layouts/Page/Page";
import { useNavigate } from "react-router-dom";
import { Button, Fade } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./users.css";
import { colors } from "../../assets";
import { deleteUserWithId, getAllUsers } from "../../api/users";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { enqueueSnackbar } from "notistack";
import { snackbarBaseOptions } from "../../utils/snackbar";
import TableLoadingSpinner from "../../components/TableLoadingSpinner/TableLoadingSpinner";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columnNames = [
    "First Name",
    "Last Name",
    "Email",
    "No of Trips",
    "No of Vehicles",
    "",
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res);
    } catch (err) {
      console.log(err);
      enqueueSnackbar("An error occured while fetching users", {
        variant: "error",
        ...snackbarBaseOptions,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserWithId(id);
      enqueueSnackbar("User deleted successfully", {
        variant: "success",
        ...snackbarBaseOptions,
      });
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Page>
      <div className="pageHeader">
        <h1 className="page-title">Users</h1>
        <div className="headerActions">
          <Button
            sx={{
              bgcolor: colors.primary,
              borderRadius: "10px",
              "&:hover": {
                opacity: 0.9,
                bgcolor: colors.primary,
              },
            }}
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate("/users/register")}
          >
            New User
          </Button>
        </div>
      </div>

      <TableContainer>
        <Table
          className="vehicle-table"
          sx={{ backgroundColor: "white", minWidth: 650 }}
        >
          <TableHead>
            <TableRow>
              {columnNames?.map((col, index) => (
                <TableCell key={index}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableLoadingSpinner />
            ) : (
              users?.map((user, index) => (
                <Fade key={index} in={!loading} timeout={1000}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.totalTrips}</TableCell>
                    <TableCell>{user.totalVehicles}</TableCell>
                    <TableCell>
                      <DeleteOutlineIcon
                        sx={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDeleteUser(user?.id)}
                      />
                    </TableCell>
                  </TableRow>
                </Fade>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}
