import { Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Bounce, toast } from "react-toastify";

const UpdateAdmissions = () => {
    let { id } = useParams();
    let Uid = id;
    const navigate = useNavigate();

 const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [className, setClassName] = useState("");
  const [gender, setGender] = useState("");
  const [parentName, setParentName] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const docSnap = await getDoc(doc(db, "admissions", Uid));
            if (docSnap.exists()) {
                const studentData = docSnap.data();
                setStudentName(studentData.studentName);
                setParentName(studentData.parentName);
                setEmail(studentData.email);
                setGender(studentData.gender);
                setClassName(studentData.className);
                setPhone(studentData.phone);
                setAddress(studentData.address);
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
                studentName,
                email,
                address,
                phone,
                className,
                gender,
                parentName,
            };

            await updateDoc(doc(db, "admissions", Uid), updatedData);
            console.log("Document updated successfully!");
            toast.success('Admission information Updated successfully', {
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
            navigate('/admission/view-admission')

        } catch (error) {
            console.error("Error updating document:", error);
            toast.error('Error in updating information..', {
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
                Update Admission
            </Typography>

            <br />

            <TextField
                label="Enter Student Name"
                value={studentName}
                fullWidth
                onChange={(e) => setStudentName(e.target.value)}
            />
            <br /><br />

            <TextField
                label="Enter Parent Name"
                value={parentName}
                fullWidth
                onChange={(e) => setParentName(e.target.value)}
            />
            <br /><br />

            <TextField
                label="Enter Address"
                value={address}
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
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
                value={className}
                fullWidth
                onChange={(e) => setClassName(e.target.value)}
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
                onClick={() => navigate("/admission/view-admission")}
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

export default UpdateAdmissions;
