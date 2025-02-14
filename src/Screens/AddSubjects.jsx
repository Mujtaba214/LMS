import { Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { Bounce, toast } from "react-toastify";

const AddSubjects = () => {
  const navigate = useNavigate()

  const [subjectName, setSubjectName] = useState("")
  const [fields, setFields] = useState("")
  const [classes, setClasses] = useState("")
  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    handleSubmit()
  }, [refresh])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName|| !fields || !classes) {
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
      let obj = { subjectName,  fields, classes };

      const res = await addDoc(collection(db, "subjects"), obj);
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
      navigate('/subjects/view-subjects')

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
          Add Subjects
        </Typography>

        <br />

        <TextField
          label="Enter Subject Name"
          fullWidth
          onChange={(e) => setSubjectName(e.target.value)}
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
          onChange={(e) => setFields(e.target.value)}
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel value="Medical" control={<Radio />} label="Medical" />
          <FormControlLabel value="Computer Science" control={<Radio />} label="Computer Science" />
          <FormControlLabel value="Commerce" control={<Radio />} label="Commerce" />
        </RadioGroup>

        <br /><br />

        <Button
          onClick={handleSubmit}
          color="success"
          fullWidth
          variant="contained"
          sx={{ marginBottom: 2,fontFamily:"Montserrat" }}
        >
          Add
        </Button>

        <Button
          onClick={() => navigate("/subjects/view-subjects")}
          color="error"
          fullWidth
          variant="contained"
          sx={{ marginBottom: 2,fontFamily:"Montserrat" }}
        >
          Back
        </Button>
      </Paper>

    </>
  )
}

export default AddSubjects