import { UserFormType } from "@/types/user/UserForm";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const users: UserFormType[] = [];
export const ScheduleTable = () => {
  return (
    <>
      <Button
        onClick={() => {
          //   setOnClickButton(!onClickButton);
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
                key={row.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                // onClick={() => {
                //   setChosenUser(row);
                //   setOnClickButton(true);
                // }}
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
    </>
  );
};
