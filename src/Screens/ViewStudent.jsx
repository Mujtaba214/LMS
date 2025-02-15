import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import StudentTable from "../Components/StudentTable";

const ViewStudent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const[refresh,setRefresh] = useState(false)
  useEffect(() => {
    getData()
  }, [refresh])
  const getData = async () => {
    try {
      let arr = [];
      const getDataVal = await getDocs(collection(db, "students"))
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

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "students", id))
    toast.success("User Deleted successfully", {
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
    navigate('/student/view-student')
    setRefresh(!refresh)
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
          onClick={() => navigate("/student/add-student")}
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

      {data && <StudentTable data={data} />}
    </div>

  );
};

export default ViewStudent;