import { Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Bounce, toast } from "react-toastify";

const SyllabusUpdate = () => {
    let { id } = useParams();
    let Uid = id;
    const navigate = useNavigate();

    const [contents, setContents] = useState("")
    const [courseName, setCourseName] = useState("")
    const [field, setField] = useState("")
    const [classes, setClasses] = useState("")

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const docSnap = await getDoc(doc(db, "syllabus", Uid));
            if (docSnap.exists()) {
                const studentData = docSnap.data();
                setCourseName(studentData.courseName);
                setContents(studentData.contents);
                setField(studentData.field);
                setClasses(studentData.classes);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching student:", error);
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

            await updateDoc(doc(db, "syllabus", Uid), updatedData);
            console.log("Syllabus updated successfully!");
            toast.success('User Updated successfully', {
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
            navigate('/syllabus/syllabus-list')

        } catch (error) {
            console.error("Error updating syllabus:", error);
            toast.error('Error in updating user..', {
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
                width: { xs: "70vw", sm: "80vw", md: "40vw" },
                maxWidth: "500px",
                marginX: "auto",
                padding: { xs: 3, sm: 5 },
            }}
        >
            <Typography
                // variant={{ xs: "h6", sm: "h5",md:"h4" }}
                variant="h5"
                sx={{ textAlign: "center", display: "block", fontFamily: "Montserrat" }}
            >
                Update Syllabus
            </Typography>

            <br />

            <TextField
                label="Enter Course Name"
                value={courseName}
                fullWidth
                onChange={(e) => setCourseName(e.target.value)}
            />
            <br /><br />

            <TextField
                label="Enter Its Contents"
                value={contents}
                multiline
                rows={3}
                fullWidth
                onChange={(e) => setContents(e.target.value)}
            />
            <br /><br />

            <TextField
                label="Enter Class"
                value={classes}
                fullWidth
                onChange={(e) => setClasses(e.target.value)}
            />
            <br /><br />

            <FormLabel id="demo-radio-buttons-group-label">Field</FormLabel>
            <RadioGroup
                value={field}
                onChange={(e) => setField(e.target.value)}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel value="Science" control={<Radio />} label="Science" />
                <FormControlLabel value="Computer Science" control={<Radio />} label="Computer Science" />
                <FormControlLabel value="Commerce" control={<Radio />} label="Commerce" />
            </RadioGroup>

            <br /><br />

            <Button
                onClick={handleSubmit}
                color="success"
                fullWidth
                variant="contained"
                sx={{ marginBottom: 2, fontFamily: "Montserrat" }}
            >
                Add
            </Button>

            <Button
                onClick={() => navigate("/syllabus/syllabus-list")}
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

export default SyllabusUpdate;
