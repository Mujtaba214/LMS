import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SelectTextFields from './SelectTextFields';
import { Paper } from '@mui/material';
import BasicButtons from './BasicButtons';
import { useState } from 'react';

export default function BasicTextFields() {
    const [data, setData] = useState({
        class:"",
        name: "",
        fname: "",
        pay: ""
    })
    const proccessBtn = () => {

    }
    return (
        <Paper elevation={2} sx={{ width: "40vw", height: "80vh", marginX: "auto", padding: 5 }} >
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                noValidate
                autoComplete="off"
            >
                <SelectTextFields data={data} setData={setData} />
                <TextField
                    sx={{
                        border: "1px solid green",
                        borderRadius: "6px",
                        paddingBottom: "-2px"
                    }}
                    id="outlined-basic" label="Enter your name" color="success"
                    variant="filled"
                    onChange={(e) => {
                        setData({ ...data, name: e.target.value })
                    }}
                />
                <TextField
                    sx={{
                        border: "1px solid green",
                        borderRadius: "6px",
                        paddingBottom: "-2px"
                    }}
                    id="outlined-basic" label="Enter your father name" color="success"
                    variant="filled"
                    onChange={(e) => {
                        setData({ ...data, fname: e.target.value })
                    }}
                />
                <TextField
                    sx={{
                        border: "1px solid green",
                        borderRadius: "6px",
                        paddingBottom: "-2px"
                    }}
                    id="outlined-basic" label="Enter your fee amount" color="success"
                    variant="filled"
                    onChange={(e) => {
                        setData({ ...data, pay: e.target.value })
                    }}
                />
                <BasicButtons onClick={proccessBtn} data={data} />
            </Box>
        </Paper>
    );
}
