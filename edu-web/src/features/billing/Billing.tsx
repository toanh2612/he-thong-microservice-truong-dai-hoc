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
import { useEffect, useState } from "react";

const mockData = [
  {
    subject: "Toán cao cấp - L01",
    credits: "3",
    priceOfOneCredit: "390 000",
    price: "1 170 000",
  },
  {
    subject: "Tếng Anh 1 - L05",
    credits: "3",
    priceOfOneCredit: "390 000",
    price: "1 170 000",
  },
  {
    subject: "Phương pháp tính - L02",
    credits: "1",
    priceOfOneCredit: "390 000",
    price: "390 000",
  },
];

export default function Billing() {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <>
      {" "}
      {hasWindow && (
        <>
          <div
            style={{
              position: "relative",
              margin: "10rem 20% 50px 20% ",
            }}
          >
            <div style={{}}>
              <TableContainer component={Paper} className="scroll-x-auto">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Class
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Credits
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Price
                    </TableCell>
                  </TableHead>

                  <TableBody>
                    <TableRow key={1}>
                      <TableCell> Toán cao cấp - L01</TableCell>
                      <TableCell> 3</TableCell>
                      <TableCell>1 170 000 </TableCell>
                    </TableRow>
                    <TableRow key={2}>
                      <TableCell>Tếng Anh 1 - L05</TableCell>
                      <TableCell> 3</TableCell>
                      <TableCell>1 170 000 </TableCell>
                    </TableRow>
                    <TableRow key={3}>
                      <TableCell> Phương pháp tính - L02</TableCell>
                      <TableCell> 1</TableCell>
                      <TableCell>390 000</TableCell>
                    </TableRow>
                  </TableBody>

                  {/* <TableHead> */}
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    colSpan={2}
                  >
                    Toal
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    colSpan={1}
                  >
                    2 730 000
                  </TableCell>
                  {/* </TableHead> */}
                </Table>
              </TableContainer>

              <div
                style={{
                  margin: "1rem 0rem",
                  textAlign: "center",
                }}
              >
                <Button variant="contained" size="large">
                  Pay
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
