import React from "react";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

const examSchedule = [
  { subject: "Mathematics", date: "2025-03-10", time: "10:00 AM", className: "Class 1", duration: "60 mins" },
  { subject: "Science", date: "2025-03-12", time: "11:30 AM", className: "Class 1", duration: "75 mins" },
  { subject: "English", date: "2025-03-12", time: "11:30 AM", className: "Class 1", duration: "75 mins" },
  { subject: "Mathematics", date: "2025-03-10", time: "10:00 AM", className: "Class 2", duration: "60 mins" },
  { subject: "Science", date: "2025-03-12", time: "11:30 AM", className: "Class 2", duration: "75 mins" },
  { subject: "English", date: "2025-03-12", time: "11:30 AM", className: "Class 2", duration: "75 mins" },
  { subject: "Mathematics", date: "2025-03-10", time: "10:00 AM", className: "Class 3", duration: "60 mins" },
  { subject: "Science", date: "2025-03-12", time: "11:30 AM", className: "Class 3", duration: "75 mins" },
  { subject: "English", date: "2025-03-12", time: "11:30 AM", className: "Class 3", duration: "75 mins" },
  { subject: "Mathematics", date: "2025-03-10", time: "10:00 AM", className: "Class 4", duration: "60 mins" },
  { subject: "Science", date: "2025-03-12", time: "11:30 AM", className: "Class 4", duration: "75 mins" },
  { subject: "English", date: "2025-03-12", time: "11:30 AM", className: "Class 4", duration: "75 mins" },
  { subject: "Mathematics", date: "2025-03-10", time: "10:00 AM", className: "Class 5", duration: "60 mins" },
  { subject: "Science", date: "2025-03-12", time: "11:30 AM", className: "Class 5", duration: "75 mins" },
  { subject: "English", date: "2025-03-12", time: "11:30 AM", className: "Class 5", duration: "75 mins" },
  { subject: "Mathematics", date: "2025-03-10", time: "10:00 AM", className: "Class 6", duration: "60 mins" },
  { subject: "Science", date: "2025-03-12", time: "11:30 AM", className: "Class 6", duration: "75 mins" },
  { subject: "English", date: "2025-03-12", time: "11:30 AM", className: "Class 6", duration: "75 mins" },
  { subject: "Mathematics", date: "2025-03-10", time: "10:00 AM", className: "Class 7", duration: "60 mins" },
  { subject: "Science", date: "2025-03-12", time: "11:30 AM", className: "Class 7", duration: "75 mins" },
  { subject: "English", date: "2025-03-12", time: "11:30 AM", className: "Class 7", duration: "75 mins" },
  { subject: "Mathematics", date: "2025-03-10", time: "10:00 AM", className: "Class 8", duration: "60 mins" },
  { subject: "Science", date: "2025-03-12", time: "11:30 AM", className: "Class 8", duration: "75 mins" },
  { subject: "English", date: "2025-03-12", time: "11:30 AM", className: "Class 8", duration: "75 mins" },
  { subject: "English", date: "2025-03-14", time: "09:00 AM", className: "Class 2", duration: "60 mins" },
  { subject: "History", date: "2025-03-16", time: "10:30 AM", className: "Class 9", duration: "90 mins" },
  { subject: "Physics", date: "2025-03-18", time: "12:00 PM", className: "Class 9", duration: "60 mins" },
  { subject: "Chemistry", date: "2025-03-20", time: "01:30 PM", className: "Class 9", duration: "75 mins" },
  { subject: "Biology", date: "2025-03-22", time: "03:00 PM", className: "Class 9", duration: "60 mins" },
  { subject: "Geography", date: "2025-03-24", time: "10:00 AM", className: "Class 9", duration: "90 mins" },
  { subject: "Computer Science", date: "2025-03-26", time: "12:00 PM", className: "Class 9", duration: "75 mins" },
  { subject: "Economics", date: "2025-03-28", time: "02:30 PM", className: "Class 9", duration: "90 mins" },
  { subject: "Business Studies", date: "2025-03-30", time: "04:00 PM", className: "Class 9", duration: "60 mins" },
  { subject: "History", date: "2025-03-16", time: "10:30 AM", className: "Class 10", duration: "90 mins" },
  { subject: "Physics", date: "2025-03-18", time: "12:00 PM", className: "Class 10", duration: "60 mins" },
  { subject: "Chemistry", date: "2025-03-20", time: "01:30 PM", className: "Class 10", duration: "75 mins" },
  { subject: "Biology", date: "2025-03-22", time: "03:00 PM", className: "Class 10", duration: "60 mins" },
  { subject: "Geography", date: "2025-03-24", time: "10:00 AM", className: "Class 10", duration: "90 mins" },
  { subject: "Computer Science", date: "2025-03-26", time: "12:00 PM", className: "Class 10", duration: "75 mins" },
  { subject: "Economics", date: "2025-03-28", time: "02:30 PM", className: "Class 10", duration: "90 mins" },
  { subject: "Business Studies", date: "2025-03-30", time: "04:00 PM", className: "Class 10", duration: "60 mins" },
];

const getClassColor = (className) => {
  const colors = {
    "Class 1": "#FFEBEE",
    "Class 2": "#E3F2FD",
    "Class 3": "#E8F5E9",
    "Class 4": "#FFF3E0",
    "Class 5": "#EDE7F6",
    "Class 6": "#FCE4EC",
    "Class 7": "#E0F7FA",
    "Class 8": "#F1F8E9",
    "Class 9": "#FFECB3",
    "Class 10": "#D7CCC8",
  };
  return colors[className] || "#FFFFFF";
};

const ExamSchedule = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 4, fontWeight: "bold", fontFamily: "Montserrat" }}>
        📅 Exam Schedule (Classes 1-10)
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {examSchedule.map((exam, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ bgcolor: getClassColor(exam.className), borderRadius: 3, boxShadow: 3, fontFamily: "Montserrat" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
                  {exam.subject}
                </Typography>
                <Typography sx={{ fontFamily: "Montserrat" }}>Date: {exam.date}</Typography>
                <Typography sx={{ fontFamily: "Montserrat" }}>Time: {exam.time}</Typography>
                <Typography sx={{ fontFamily: "Montserrat" }}>Class: {exam.className}</Typography>
                <Typography sx={{ fontFamily: "Montserrat" }}>Duration: {exam.duration}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExamSchedule;
