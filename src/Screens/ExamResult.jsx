import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from "@mui/material";

const examResult = [];

const ExamResult = () => {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, fontFamily: "Montserrat" }}>
        Exam Results
      </Typography>

      {examResult.length === 0 ? (
        <Typography sx={{ fontFamily: "Montserrat" }} variant="h6" color="error">
          📢 Exam results will be announced soon!
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={5}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Student Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Class</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Subject</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Marks</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examResult.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.student}</TableCell>
                  <TableCell>{result.className}</TableCell>
                  <TableCell>{result.subject}</TableCell>
                  <TableCell>{result.marks}</TableCell>
                  <TableCell>{result.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
      }
    </Container >
  );
};

export default ExamResult;
