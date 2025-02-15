import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import StudentTable from "../Components/StudentTable";
import SyllabusTable from "../Components/SyllabusTable";

const SyllabusList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    getData()
  }, [refresh])
  const getData = async () => {
    try {
      let arr = [];
      const getDataVal = await getDocs(collection(db, "syllabus"))
      getDataVal.forEach((e) => {
        console.log(e.data());
        arr.push({
          ...e.data(),
          id: e.id
        })
      })
      setData([...arr])
      setRefresh(!refresh)
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "20px"
        }}
      >

        <Button
          onClick={() => navigate("/syllabus/syllabus-form")}
          startIcon={<AddRoundedIcon />}
          variant="filled"
          sx={{
            backgroundColor: "rgb(0, 112, 103)",
            color: "white", fontFamily: "Montserrat"
          }}
        >
          Add
        </Button>
      </div>

      {data && <SyllabusTable data={data} />}
    </div>

  );
};

export default SyllabusList;