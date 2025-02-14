import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const classes = [
    {
        value: 'Class 1',
    },
    {
        value: 'Class 2',
    },
    {
        value: 'Class 3',
    },
    {
        value: 'Class 4',
    },
    {
        value: 'Class 5',
    },
    {
        value: 'Class 6',
    },
    {
        value: 'Class 7',
    },
    {
        value: 'Class 8',
    },
    {
        value: 'Class 9',
    },
    {
        value: 'Class 10',
    },
];

export default function SelectTextFields() {
    const [val, setVal] = useState("")
    console.log(val);

    
    
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    onChange={(e) => {
                        setVal(e.target.value)
                    }}
                    sx={{
                        border: "1px solid green",
                        borderRadius: "6px",
                    }}
                    variant='filled'
                    select
                    label="Select your class"
                    color='success'
                    // helperText="Please select your class"
                >
                    {classes.map((option, i) => (
                        <MenuItem key={i} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>

            </div>
        </Box>
    );
}
