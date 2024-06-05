import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import moment from "moment";

const MyTableComponent = ({ bet_history_Data }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the number of pages
  const pageCount = Math.ceil(bet_history_Data?.length / itemsPerPage);

  // Get the data for the current page
  const paginatedData = bet_history_Data?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No.</TableCell>
              <TableCell align="center">Number</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Win</TableCell>
              <TableCell align="center">Date/Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {(page - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">
                  {row?.number_result || " "}
                </TableCell>
                <TableCell align="center">
                  {Number(row?.amount || 0)?.toFixed(2) || 0}
                </TableCell>
                <TableCell align="center">
                  {Number(row?.win)?.toFixed(2) || 0}
                </TableCell>
                <TableCell align="center" className="!whitespace-nowrap">
                  {moment(row?.datetime)?.format("DD-MM-YYYY")}{" "}
                  {moment(row?.datetime)?.format("HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        sx={{ my: 2 }}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </>
  );
};

export default MyTableComponent;
