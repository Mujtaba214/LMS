import { Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { Bounce, toast } from "react-toastify";

const SchoolRegistration = () => {
  const navigate = useNavigate()

  const [schlName, setSchlName] = useState("")
  const [adminName, setAdminName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [adminPhone, setAdminPhone] = useState("")
  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    handleSubmit()
  }, [refresh])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schlName || !address || !email || !city || !phone || !adminName || !adminEmail || !adminPhone) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      let obj = { schlName, city, email, address, phone,adminEmail,adminName,adminPhone };

      const res = await addDoc(collection(db, "schools"), obj);
      console.log(res);
      setRefresh(!refresh);

      toast.success("School Registered successfully", {
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
      // navigate('/school/view-school')

    } catch (error) {

      toast.error("Error in registering school..", {
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

  }

  return (
    <>
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
          variant="h5"
          sx={{ textAlign: "center", display: "block", fontFamily: "Montserrat" }}
        >
          School Registration
        </Typography>

        <br />

        <TextField
          label="Enter School Name"
          fullWidth
          onChange={(e) => setSchlName(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter School Address Name"
          fullWidth
          onChange={(e) => setAddress(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter School Email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter City"
          fullWidth
          onChange={(e) => setCity(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter Phone Number"
          fullWidth
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

        <Typography
          variant="h5"
          sx={{ textAlign: "center", display: "block", fontFamily: "Montserrat" }}
        >
          Administrator Details
        </Typography>

        <br />

        <TextField
          label="Enter Full Name"
          fullWidth
          onChange={(e) => setAdminName(e.target.value)}
        />

        <br /><br />
        <TextField
          label="Enter Email Address"
          fullWidth
          onChange={(e) => setAdminEmail(e.target.value)}
        />

        <br /><br />
        <TextField
          label="Enter Phone Number"
          fullWidth
          onChange={(e) => setAdminPhone(e.target.value)}
        />

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
          onClick={() => navigate("/school/view-school")}
          color="error"
          fullWidth
          variant="contained"
          sx={{ marginBottom: 2, fontFamily: "Montserrat" }}
        >
          Back
        </Button>
      </Paper>
    </>
  )
}

export default SchoolRegistration;