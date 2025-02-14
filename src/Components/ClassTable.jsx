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


export default function ClassTable({ data }) {
    const [refresh, setRefresh] = useState(true)

    const deleteData = async (id) => {
        await deleteDoc(doc(db, "class", id))
        toast.success("User Deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigate('/class/class-list')
        setRefresh(!refresh)
    }

    const navigate = useNavigate()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800, }}>
                <TableHead className='table-row'>
                    <TableRow sx={{
                        backgroundColor: "#008080"
                    }} >
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell align="center">Last Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Gender</StyledTableCell>
                        <StyledTableCell align="center">Class</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <StyledTableRow sx={{
                            fontFamily: "Montserrat"
                        }} key={i}>
                            <StyledTableCell component="th" scope="row">
                                {row.firstName}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                            <StyledTableCell align="center">{row.gender}</StyledTableCell>
                            <StyledTableCell align="center">{row.classes}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    onClick={() => {
                                        navigate(`/class/class-update/${row.id}`);
                                    }}
                                    // startIcon={<EditIcon />}
                                    sx={{ marginRight: 2 }}
                                    variant="contained"
                                    color='success'
                                >
                                    Update
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    // endIcon={<DeleteIcon />}
                                    sx={{ marginRight: 2 }}
                                    variant="contained"
                                    color='error'
                                    onClick={() => {
                                        deleteData(row.id)
                                    }}
                                >
                                    Delete
                                </Button>
                            </StyledTableCell>


                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
