import { Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { Bounce, toast } from "react-toastify";

const AddStudent = () => {
  const navigate = useNavigate()

  const [contents, setContents] = useState("")
  const [courseName, setCourseName] = useState("")
  const [field, setField] = useState("")
  const [classes, setClasses] = useState("")
  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    handleSubmit()
  }, [refresh])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName || !contents || !field || !classes) {
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
      let obj = { courseName, contents, field, classes };

      const res = await addDoc(collection(db, "syllabus"), obj);
      console.log(res);
      setRefresh(!refresh);

      toast.success("Syllabus Added successfully", {
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
      navigate('/syllabus/syllabus-list ')

    } catch (error) {

      toast.error("Error in adding syllabus..", {
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
          // variant={{ xs: "h6", sm: "h5",md:"h4" }}
          variant="h5"
          sx={{ textAlign: "center", display: "block", fontFamily: "Montserrat" }}
        >
          Add Syllabus
        </Typography>

        <br />

        <TextField
          label="Enter Course Name"
          fullWidth
          onChange={(e) => setCourseName(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter Its Contents"
          multiline
          rows={3}
          fullWidth
          onChange={(e) => setContents(e.target.value)}
        />
        <br /><br />

        <TextField
          label="Enter Class"
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
          onClick={() => navigate("/student/view-student")}
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

export default AddStudent