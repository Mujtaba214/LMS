import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function BasicButtons({ proccessBtn, data }) {
    const navigate = useNavigate()
    proccessBtn = () => {
        const output = data.name && data.fname && data.pay ? navigate('/dashboard/fee/fee-proccessing') : alert("all fields are required")
        console.log(data);
        return output
    }
    return (
        <Stack sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }} spacing={2} direction="row">
            <Button onClick={proccessBtn} variant="contained" color='success'>Proccess</Button>
        </Stack>
    );
}
