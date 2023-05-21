import { UserFormType } from "@/types/user/UserForm";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { UserForm } from "./UserForm";

export const defaultUser: UserFormType = {
  username: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  id: "",
  password: "",
  roleId: "",
  personalEmail: "",
  birthday: "",
  sex: "",
  isDeleted: false,
  createdDate: "",
  updatedDate: "",
  role: {
    id: "",
    name: "",
    description: "",
    isDeleted: false,
    createdDate: "2023-01-01T00:00:00.000Z",
    updatedDate: "2023-01-01T00:00:00.000Z",
  },
};
export function UserTable({
  users,
  onRefetch,
}: {
  users: UserFormType[];
  onRefetch: Function;
}) {
  const [onClickButton, setOnClickButton] = useState(false);
  const [userId, setUserId] = useState("");
  const [chosenUser, setChosenUser] = useState<UserFormType>(defaultUser);

  return (
    <>
      <Button
        onClick={() => {
          setOnClickButton(!onClickButton);
        }}
        variant="contained"
        style={{
          margin: "1rem 0",
        }}
      >
        Add New User
      </Button>
      <TableContainer component={Paper} className="scroll-x-auto">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                style={{ cursor: "pointer" }}
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  setChosenUser(row);
                  setOnClickButton(true);
                }}
              >
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.sex}</TableCell>
                <TableCell>{row.role?.name || ""}</TableCell>
                <TableCell>{row.birthday}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserForm
        onClickButton={onClickButton}
        setOnClickButton={setOnClickButton}
        value={chosenUser}
        setValue={setChosenUser}
        onRefetch={onRefetch}
      />
    </>
  );
}
