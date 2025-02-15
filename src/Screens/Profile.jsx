import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card } from "@mui/material";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear()
        navigate('/login')
    }
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
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop:"40px",
                height: "100vh",
                bgcolor: "#f4f6f8", 
            }}
        >
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
                    Profile
                </Typography>
                {userData ? (
                    <>
                        <Typography variant="h6" sx={{ mb: 1, color: "gray" }}>
                            Name: <strong>{userData.name}</strong>
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 3, color: "gray" }}>
                            Email: <strong>{userData.email}</strong>
                        </Typography>
                        <Button variant="contained" color="error" onClick={logOut}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Typography sx={{ color: "red" }}>No user data found.</Typography>
                )}
            </Box>
        // </Box>

    );
};

export default Profile;
