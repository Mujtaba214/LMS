import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Card, CardContent } from "@mui/material";
import { School, Event, Assignment, BarChart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
    const [userData, setUserData] = useState("");
    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such user data found!");
                }
            } else {
                navigate("/login");
            }
            // setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    // console.log(userData);


    return (
        <Box sx={{ padding: 1, bgcolor: "#f9f9f9", minHeight: "100vh" }}>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, fontFamily: "Montserrat", textAlign: "center" }}>
                Welcome Back, {userData.name}
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#1976d2", color: "white" }}>
                        <CardContent sx={{
                            fontFamily: "Montserrat"
                        }}>
                            <Event sx={{ fontSize: 40, fontFamily: "Montserrat" }} />
                            <Typography sx={{
                                fontFamily: "Montserrat"
                            }} variant="h6">Upcoming Exams</Typography>
                            <Typography sx={{
                                fontFamily: "Montserrat"
                            }} variant="h4">3</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#2e7d32", color: "white" }}>
                        <CardContent>
                            <Assignment sx={{ fontSize: 40 }} />
                            <Typography sx={{
                                fontFamily: "Montserrat"
                            }} variant="h6">Pending Assignments</Typography>
                            <Typography sx={{
                                fontFamily: "Montserrat"
                            }} variant="h4">5</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#f57c00", color: "white" }}>
                        <CardContent>
                            <School sx={{ fontSize: 40 }} />
                            <Typography sx={{
                                fontFamily: "Montserrat"
                            }} variant="h6">Attendance</Typography>
                            <Typography sx={{
                                fontFamily: "Montserrat"
                            }} variant="h4">92%</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#d32f2f", color: "white" }}>
                        <CardContent>
                            <BarChart sx={{ fontSize: 40 }} />
                            <Typography sx={{
                                fontFamily: "Montserrat"
                            }} variant="h6">Performance</Typography>
                            <Typography sx={{
                                fontFamily: "Montserrat"
                            }} variant="h4">A</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
                    Class Schedule
                </Typography>
                <Typography sx={{
                    fontFamily: "Montserrat"
                }}>- Math (10:00 AM - 11:00 AM)</Typography>
                <Typography sx={{
                    fontFamily: "Montserrat"
                }}>- Science (11:30 AM - 12:30 PM)</Typography>
                <Typography sx={{
                    fontFamily: "Montserrat"
                }}>- English (1:00 PM - 2:00 PM)</Typography>
            </Paper>

            <Paper sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
                    Announcements
                </Typography>
                <Typography sx={{
                    fontFamily: "Montserrat"
                }}>- Midterm exams start next week.</Typography>
                <Typography sx={{
                    fontFamily: "Montserrat"
                }}>- Submit assignments before Friday.</Typography>
            </Paper>
        </Box>
    );
};

export default Dashboard;
