import { Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Bounce, toast } from "react-toastify";

const UpdateStudent = () => {
    let { id } = useParams();
    let Uid = id;
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [classes, setClasses] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const docSnap = await getDoc(doc(db, "class", Uid));
            if (docSnap.exists()) {
                const studentData = docSnap.data();
                setFirstName(studentData.firstName);
                setLastName(studentData.lastName);
                setEmail(studentData.email);
                setGender(studentData.gender);
                setClasses(studentData.classes);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching class:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            let updatedData = {
                firstName,
                lastName,
                email,
                gender,
                classes
            };

            await updateDoc(doc(db, "class", Uid), updatedData);
            console.log("Document updated successfully!");
            toast.success('Class Updated successfully', {
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

        } catch (error) {
            console.error("Error updating document:", error);
            toast.error('Error in updating class..', {
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
        }
    };

    return (
        <Paper
            elevation={20}
            sx={{
                width: { xs: "70vw", sm: "70vw", md: "50vw", lg: "40vw" },
                maxWidth: "500px",
                marginX: "auto",
                padding: { xs: 3, sm: 4, md: 5 },
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                    fontFamily: "Montserrat",
                }}
            >
                Update Student
            </Typography>

            <br />

            <TextField
                label="Enter First Name"
                value={firstName}
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
            />
            <br /><br />

            <TextField
                label="Enter Last Name"
                value={lastName}
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
            />
            <br /><br />

            <TextField
                label="Enter Email"
                value={email}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <TextField
                label="Enter Class"
                value={classes}
                fullWidth
                onChange={(e) => setClasses(e.target.value)}
            />
            <br /><br />

            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>

            <br /><br />

            <Button
                onClick={handleSubmit}
                color="success"
                fullWidth
                variant="contained"
                sx={{ marginBottom: 2, fontFamily: "Montserrat" }}
            >
                Update
            </Button>

            <Button
                onClick={() => navigate("/class/class-list")}
                color="error"
                fullWidth
                variant="contained"
                sx={{ marginBottom: 2, fontFamily: "Montserrat" }}
            >
                Back
            </Button>
        </Paper>

    );
};

export default UpdateStudent;
