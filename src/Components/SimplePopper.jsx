import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

export default function SimplePopper({ fees, className }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <button
                style={{
                    backgroundColor: "rgb(0, 70, 70)",
                    color: "white",
                    borderRadius: 10,
                    padding: "5px 5px 7px 7px",
                    height: "46px",
                    fontWeight: 500,
                    cursor: "pointer"
                }}
                aria-describedby={id} type="button" onClick={handleClick}>
                Click to view the fees
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, textAlign:"right", bgcolor: 'background.paper' }}>
                    <h2 style={{
                        textAlign: "center",
                        paddingLeft:"15px"
                    }}>The fees of {className} is {fees} </h2>
                    <p style={{
                        textAlign: "right"
                    }}>Visit us at Gulistan-e-Johar block 13 near Millenium Mall for more info</p>
                    <p style={{
                        textAlign: "right"
                    }}> You can contact us at <span style={{
                        textDecoration: "underline"
                    }} >lms@edu.pk.com</span> </p>
                </Box>
            </Popper>
        </div>
    );
}
