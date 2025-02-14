import { Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardLayout from './Screens/DashboardLayout'
import AddStudent from './Screens/AddStudent'
import ViewStudent from './Screens/ViewStudent'
import UpdateStudent from './Screens/UpdateStudent'
import AddTeacher from './Screens/AddTeacher'
import ViewTeacher from './Screens/ViewTeacher'
import UpdateTeacher from './Screens/UpdateTeacher'
import AddSubjects from './Screens/AddSubjects'
import ViewSubjects from './Screens/ViewSubjects'
import UpdateSubjects from './Screens/UpdateSubjects'
import SchoolRegistration from './Screens/SchoolRegistration'
import ViewSchools from './Screens/ViewSchools'
import SyllabusForm from './Screens/SyllabusForm'
import SyllabusList from './Screens/SyllabusList'
import ClassForm from './Screens/ClassForm'
import ClassList from './Screens/ClassList'
import FeeStructure from './Screens/FeeStructure'
import FeeSubmission from './Screens/FeeSubmission'
import FeeVoucher from './Screens/FeeVoucher'
import Admission from './Screens/Admission'
import ExamSchedule from './Screens/ExamSchedule'
import ExamResult from './Screens/ExamResult'
import FeeProccessing from './Screens/FeeProccessing'
import UpdateClass from './Screens/UpdateClass'
import Dashboard from './Screens/Dashboard'
import { Bounce, ToastContainer } from 'react-toastify'
import ViewAdmissions from './Screens/ViewAdmissions'
import UpdateAdmissions from './Screens/UpdateAdmissions'
import SyllabusUpdate from './Screens/SyllabusUpdate'
import SignUp from './Screens/SignUp'
import Login from './Screens/Login'
import AuthRoute from './Components/AuthRoute'
import ProtectedRoute from './Components/ProtectedRoute'
import Profile from './Screens/Profile'


function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<DashboardLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='student' >
              <Route path='add-student' element={<AddStudent />} />
              <Route path='view-student' element={<ViewStudent />} />
              <Route path='update-student/:id' element={<UpdateStudent />} />
            </Route>
            <Route path='teacher' >
              <Route path='add-teacher' element={<AddTeacher />} />
              <Route path='view-teacher' element={<ViewTeacher />} />
              <Route path='update-teacher/:id' element={<UpdateTeacher />} />
            </Route>
            <Route path='subjects' >
              <Route path='add-subjects' element={<AddSubjects />} />
              <Route path='view-subjects' element={<ViewSubjects />} />
              <Route path='update-subjects/:id' element={<UpdateSubjects />} />
            </Route>
            <Route path='school' >
              <Route path='school-registration' element={<SchoolRegistration />} />
              <Route path='view-school' element={<ViewSchools />} />
            </Route>
            <Route path='syllabus' >
              <Route path='syllabus-form' element={<SyllabusForm />} />
              <Route path='syllabus-list' element={<SyllabusList />} />
              <Route path='syllabus-update/:id' element={<SyllabusUpdate />} />
            </Route>
            <Route path='class' >
              <Route path='class-form' element={<ClassForm />} />
              <Route path='class-list' element={<ClassList />} />
              <Route path='class-update/:id' element={<UpdateClass />} />
            </Route>
            <Route path='fee' >
              <Route path='fee-structure' element={<FeeStructure />} />
              <Route path='fee-submission' element={<FeeSubmission />} />
              <Route path='fee-voucher/:id' element={<FeeVoucher />} />
              <Route path='fee-proccessing' element={<FeeProccessing />} />
            </Route>
            <Route path='admission' >
              <Route path='admission' element={<Admission />} />
              <Route path='view-admission' element={<ViewAdmissions />} />
              <Route path='update-admission/:id' element={<UpdateAdmissions />} />
            </Route>
            <Route path='exam' >
              <Route path='exam-schedule' element={<ExamSchedule />} />
              <Route path='exam-result' element={<ExamResult />} />
            </Route>
            <Route path='profile' >
              <Route path='profile-details' element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
