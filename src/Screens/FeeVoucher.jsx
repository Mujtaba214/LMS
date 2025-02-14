import { Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useParams } from "react-router-dom";

function FeeVoucher() {
  let { id } = useParams();
  let Uid = id;
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [fees, setFees] = useState("")
  const [classes, setClasses] = useState("")
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
  }, [])
  // const getData = async () => {
  //   try {
  //     let arr = [];
  //     const getDataVal = await getDocs(collection(db, "fees"))
  //     getDataVal.forEach((e) => {
  //       console.log(e.data());
  //       arr.push({
  //         ...e.data(),
  //         id: e.id
  //       })
  //     })
  //     setData([...arr])
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  const getData = async () => {
    try {
      const docSnap = await getDoc(doc(db, "fees", Uid));
      if (docSnap.exists()) {
        const studentData = docSnap.data();
        setFirstName(studentData.firstName);
        setLastName(studentData.lastName);
        setClasses(studentData.classes);
        setEmail(studentData.email);
        setFees(studentData.fees);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };
  return (
    <Paper elevation={3} sx={{ maxWidth: 800, margin: "auto", padding: 3, mt: 5 }}>
      <Typography sx={{
        paddingBottom: "10px",
        fontFamily:"Montserrat"
      }} variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
        Fee Voucher
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}><Typography><strong>Student's First Name:</strong> {firstName}</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Student's Last Name:</strong> {lastName}</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Class:</strong> {classes}</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Class:</strong> {email}</Typography></Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#008080" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fee Type</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">Amount (PKR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Tuition Fee</TableCell>
              <TableCell align="right">{fees}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Examination Fee</TableCell>
              <TableCell align="right">2,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Library Fee</TableCell>
              <TableCell align="right">500</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total Payable</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>{parseInt(fees) + 2500}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        // color="primary"
        fullWidth
        sx={{ mt: 3, backgroundColor:"#008080"}}
        onClick={() => window.print()}
      >
        Print Voucher
      </Button>
    </Paper>
  );
}

export default FeeVoucher;