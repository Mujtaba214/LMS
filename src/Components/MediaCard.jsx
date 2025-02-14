import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SimplePopper from './SimplePopper';
import img from '../assets/School Image.webp'

export default function MediaCard({ className, fees }) {
    return (
        <Card sx={{ maxWidth: 345, paddingBottom: "20px", margin: "10px", border: "2px solid rgb(1, 131, 131)" }}>
            <CardMedia
                sx={{ height: 250 }}
                image={img}
                title="School Image"
            />
            <CardContent>
                <Typography sx={{
                    fontFamily: "Poppins-serif"
                }} gutterBottom variant="h5" component="div">
                    {className}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary',fontFamily:"Montserrat" }}>
                    Studying is the key to unlocking knowledge and achieving personal growth.
                </Typography>
            </CardContent>
            <CardActions sx={{
                textAlign:"center"
            }}>
                {/* <Button size="small">Share</Button> */}
                <SimplePopper className={className} fees={fees} />
            </CardActions>
        </Card>
    );
}
