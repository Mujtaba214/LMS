import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Admission = () => {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [className, setClassName] = useState("");
  const [gender, setGender] = useState("");
  const [parentName, setParentName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentName || !email || !address || !phone || !className || !gender || !parentName) {
      toast.error("All fields are required!");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "admissions"), {
        studentName,
        email,
        address,
        phone,
        className,
        gender,
        parentName,
        timestamp: serverTimestamp(),
      });

      toast.success("Student Admission Successful!");
      setStudentName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setClassName("");
      setGender("");
      setParentName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{
        width: { xs: "75vw", sm: "80vw", md: "50vw" },
        maxWidth: "600px",
        marginX: "auto",
        padding: { xs: 3, sm: 4 },
        mt: 4,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", mb: 3, fontFamily: "Montserrat" }}>
        Admission Form
      </Typography>

      <Grid sx={{
        fontFamily: "Montserrat"
      }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Student Name"
            fullWidth
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Parent/Guardian Name"
            fullWidth
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            multiline
            rows={1}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              {[...Array(10)].map((_, index) => (
                <MenuItem key={index + 1} value={`Class ${index + 1}`}>
                  Class {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="body1">Gender</Typography>
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#008080",
              fontFamily:"Montserrat"
            }}
            fullWidth
            variant="contained"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Admission"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Admission;
