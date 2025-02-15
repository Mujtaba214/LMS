// import axios from "axios";
import React, { useEffect, useState } from "react";
// import Tables from "../components/Table";
import { Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import StickyHeadTable from "../Components/StudentTable";
import CustomizedTables from "../Components/StudentTable";
import TeacherTable from "../Components/TeacherTable";

const ViewTeacher = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    getData()
  }, [refresh])
  const getData = async () => {
    try {
      let arr = [];
      const getDataVal = await getDocs(collection(db, "teachers"))
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
          marginBottom: "20px", fontFamily: "Montserrat"
        }}
      >

        <Button
          onClick={() => navigate("/teacher/add-teacher")}
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

      {data && <TeacherTable data={data} />}
    </div>

  );
};

export default ViewTeacher;