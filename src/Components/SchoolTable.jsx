import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { FcDeleteDatabase } from 'react-icons/fc';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#008080",
        color: theme.palette.common.white,
        fontFamily: "Montserrat"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        fontFamily: "Montserrat"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function SchoolTable({ data }) {
    // const [refresh, setRefresh] = useState(true)
    // useEffect(() => {
    //     showData()
    // }, [refresh])


    function showData() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#008080" }}>
                            <StyledTableCell colSpan={5} align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                                School Details
                            </StyledTableCell>
                            <StyledTableCell colSpan={3} align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                                Admin Details
                            </StyledTableCell>
                        </TableRow>

                        <TableRow sx={{ backgroundColor: "#009999" }}>
                            <StyledTableCell align="center">School Name</StyledTableCell>
                            <StyledTableCell align="center">City</StyledTableCell>
                            <StyledTableCell align="center">School Address</StyledTableCell>
                            <StyledTableCell align="center">School Email</StyledTableCell>
                            <StyledTableCell align="center">Phone</StyledTableCell>
                            <StyledTableCell align="center">Admin Name</StyledTableCell>
                            <StyledTableCell align="center">Admin Email</StyledTableCell>
                            <StyledTableCell align="center">Admin Contact</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row, i) => (
                            <StyledTableRow key={i} sx={{ fontFamily: "Montserrat" }}>
                                <StyledTableCell align="center">{row.schlName}</StyledTableCell>
                                <StyledTableCell align="center">{row.city}</StyledTableCell>
                                <StyledTableCell align="center">{row.address}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.phone}</StyledTableCell>

                                <StyledTableCell align="center">{row.adminName}</StyledTableCell>
                                <StyledTableCell align="center">{row.adminEmail}</StyledTableCell>
                                <StyledTableCell align="center">{row.adminPhone}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const navigate = useNavigate()

    return (
        showData()

    );
}
