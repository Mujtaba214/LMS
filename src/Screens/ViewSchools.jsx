import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import SchoolTable from "../Components/SchoolTable";

const ViewSchools = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "schools", id))
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
    // navigate('/school/view-school')
    // setRefresh(!refresh)
  }


  const getData = async () => {
    try {
      let arr = [];
      const getDataVal = await getDocs(collection(db, "schools"))
      getDataVal.forEach((e) => {
        console.log(e.data());
        arr.push({
          ...e.data(),
          id: e.id
        })
      })
      setData([...arr])
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
          onClick={() => navigate("/school/school-registration")}
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

      {data && <SchoolTable data={data} fun={deleteData} />}
    </div>

  );
};

export default ViewSchools;