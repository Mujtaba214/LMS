import { Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { Bounce, toast } from "react-toastify";

const AddTeacher = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [classes, setClasses] = useState("")
  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    handleSubmit()
  }, [refresh])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !gender || !classes) {
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
      let obj = { firstName, lastName, email, gender, classes };

      const res = await addDoc(collection(db, "teachers"), obj);
      console.log(res);
      setRefresh(!refresh);

      toast.success("Added successfully", {
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
      navigate('/teacher/view-teacher')

    } catch (error) {
      // console.error("Firestore Error:", error);

      toast.error("Error in adding user..", {
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
      {/* <form onSubmit={handleSubmit}> */}
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
          Add Teacher
        </Typography>

        <br />

        <TextField
          label="Enter First Name"
          fullWidth
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter Last Name"
          fullWidth
          onChange={(e) => setLastName(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter Email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter Class"
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
          Add
        </Button>

        <Button
          onClick={() => navigate("/teacher/view-teacher")}
          color="error"
          fullWidth
          variant="contained"
          sx={{ marginBottom: 2,fontFamily:"Montserrat" }}
        >
          Back
        </Button>
      </Paper>

      {/* </form> */}
    </>
  )
}

export default AddTeacher