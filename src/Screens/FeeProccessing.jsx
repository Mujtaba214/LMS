import { Paper } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FeeProccessing = () => {
    const navigate = useNavigate()
    return (
        <>
            <Paper elevation={2} sx={{ width: "60vw", height: "80vh", marginX: "auto", padding: 5 }} >
                <h2 style={{
                    fontSize: "2em",
                    textAlign: "center",
                    fontFamily: "Montserrat"
                }}>Your fees has been Processed </h2>
                <h4 style={{
                    fontSize: "1.6em",
                    textAlign: "center",
                    fontFamily: "Montserrat"
                }}>Thank you for your co-operation</h4>
                <h5 style={{
                    fontSize: "1.2em",
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    color: "rgb(18, 97, 97)",
                    fontWeight: "bold"
                }}>Enjoy your studies..!!</h5>
                <button style={{
                    display: "block",
                    margin: "auto",
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    color: "white",
                    backgroundColor: 'rgb(18, 97, 97)',
                    padding: "9px",
                    borderRadius: "10px",
                    cursor:"pointer"
                }}
                    onClick={() => {
                    navigate('/dashboard')
                }}
                >Click here to go to the dashboard</button>
            </Paper>
        </>
    )
}

export default FeeProccessing