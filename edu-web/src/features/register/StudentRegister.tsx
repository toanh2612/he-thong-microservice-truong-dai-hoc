import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import DropDown from "@/components/dropdown2/DropDown";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const mockData = [
  {
    id: "09387cf5-1f41-4088-9ccc-1d403a6294ee",
    subjectId: "76577750-0ab3-4e8b-9321-fba7f5587779",
    name: "Toán Cao Cấp A1 - L01",
    description: "Lớp L01",
    isDeleted: false,
    createdDate: "2023-03-29T22:30:13.772Z",
    updatedDate: "2023-03-29T22:30:13.772Z",
    subject: {
      id: "76577750-0ab3-4e8b-9321-fba7f5587779",
      name: "Toán Cao Cấp A1",
      description: "Toán Cao Cấp A1: Cho những người thích toán",
      isDeleted: false,
      createdDate: "2023-03-20T16:26:18.251Z",
      updatedDate: "2023-03-20T16:26:18.251Z",
    },
  },
  //   {
  //     id: "e992a571-084b-4a0f-b5f7-6e8fe381aa91",
  //     subjectId: "aec381b2-d8dc-464c-b1f8-cae28de4d492",
  //     name: "Tiếng Anh 1 - L06",
  //     description: "Lớp L06 cho môn Tiếng Anh 1",
  //     isDeleted: false,
  //     createdDate: "2023-03-29T22:35:01.563Z",
  //     updatedDate: "2023-03-29T22:35:01.563Z",
  //     subject: {
  //       id: "aec381b2-d8dc-464c-b1f8-cae28de4d492",
  //       name: "Tiếng Anh 1",
  //       description: "toan cao cap 1",
  //       isDeleted: false,
  //       createdDate: "2023-03-21T13:23:22.456Z",
  //       updatedDate: "2023-03-21T13:23:48.358Z",
  //     },
  //   },
];

const subject = [
  {
    id: "1",
    name: "Toán Cao Cấp A1",
    description: "Toán Cao Cấp A1: Cho những người thích toán",
  },
  {
    id: "2",
    name: "Tiếng Anh Căn bản",
    description: "Toán Cao Cấp A1: Cho những người thích toán",
  },
  {
    id: "3",
    name: "Lập trình hướng đối tượng",
    description: "Toán Cao Cấp A1: Cho những người thích toán",
  },
];
export const StudentRegister = () => {
  const router = useRouter();
  const [params, setParams] = React.useState({
    page: 1,
    pageSize: 6,
  });
  const [countPage, setCountPage] = React.useState(1);
  const [checkedId, setCheckedId] = React.useState<string>("");
  const handleOnChange = (e: string) => {
    setCheckedId(e);
  };
  const [request, setRequest] = React.useState({
    subjectId: "",
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams({ ...params, page: value });
  };
  const handleChangeDropDown = (key: any, value: any) => {
    setRequest({
      ...request,
      [key]: value,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div style={{ zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Button
            // onClick={handleCreate}
            variant="contained"
            style={{
              margin: "1rem 0",
            }}
            disabled={!checkedId}
          >
            Register
          </Button>
          <div
            style={{
              minWidth: "10%",
              margin: "1rem 0",
            }}
          >
            <DropDown
              id="subjectId"
              label="Filter subject"
              list={subject}
              value={request.subjectId}
              setValue={handleChangeDropDown}
            />
          </div>
        </div>
        <TableContainer component={Paper} className="scroll-x-auto">
          <Table
            sx={{ minWidth: 650 }}
            //   sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Checked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData
                .filter((e) => !e.isDeleted)
                .map((row) => (
                  <TableRow
                    id={row.id}
                    style={{ cursor: "pointer" }}
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleOnChange(row.id)}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <Checkbox
                        id={row.id}
                        {...label}
                        checked={row.id === checkedId}
                        onChange={() => handleOnChange(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <Stack
          spacing={2}
          style={{
            zIndex: 0,
          }}
        >
          <Pagination
            count={countPage}
            defaultPage={1}
            boundaryCount={2}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};
