import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Bounce, toast } from "react-toastify";

const FeeSubmission = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fees, setFees] = useState("");
  const [classes, setClasses] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !classes || !fees) {
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
      let obj = { firstName, lastName, fees, email, classes };

      const res = await addDoc(collection(db, "fees"), obj);
      console.log("Document ID:", res.id); 

      toast.success("Redirecting to Voucher page", {
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

      navigate(`/fee/fee-voucher/${res.id}`);
    } catch (error) {
      toast.error("Error in fees submission..", {
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
        width: { xs: "90vw", sm: "80vw", md: "40vw" },
        maxWidth: "500px",
        marginX: "auto",
        padding: { xs: 3, sm: 5 },
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center", display: "block", fontFamily: "Montserrat" }}
      >
        Fee Submission
      </Typography>

      <br />

      <TextField
        label="Enter First Name"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br /><br />

      <TextField
        label="Enter Last Name"
        fullWidth
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br /><br />

      <TextField
        label="Enter Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <TextField
        label="Enter Fees"
        fullWidth
        value={fees}
        onChange={(e) => setFees(e.target.value)}
      />
      <br /><br />

      <FormControl fullWidth>
        <InputLabel id="class-select-label">Select Class</InputLabel>
        <Select
          labelId="class-select-label"
          value={classes || ""}
          onChange={(e) => setClasses(e.target.value)}
        >
          {[...Array(10)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              Class {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br /><br />

      <Button
        onClick={handleSubmit}
        color="success"
        fullWidth
        variant="contained"
        sx={{ marginBottom: 2, fontFamily: "Montserrat" }}
      >
        Process
      </Button>
    </Paper>
  );
};

export default FeeSubmission;
