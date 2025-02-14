import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PiExamBold, PiStudentBold } from "react-icons/pi";
import { GiTeacher } from 'react-icons/gi';
import { FaBook, FaMoneyBillAlt, FaSchool, FaUniversalAccess } from 'react-icons/fa';
import { MdContentPaste } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import AddStudent from './AddStudent'
import ViewStudent from './ViewStudent'
import UpdateStudent from './UpdateStudent'
import AddTeacher from './AddTeacher'
import ViewTeacher from './ViewTeacher'
import UpdateTeacher from './UpdateTeacher'
import AddSubjects from './AddSubjects'
import ViewSubjects from './ViewSubjects'
import UpdateSubjects from './UpdateSubjects'
import SchoolRegistration from './SchoolRegistration'
import ViewSchools from './ViewSchools'
import SyllabusForm from './SyllabusForm'
import SyllabusList from './SyllabusList'
import ClassForm from './ClassForm'
import ClassList from './ClassList'
import FeeStructure from './FeeStructure'
import FeeSubmission from './FeeSubmission'
import FeeVoucher from './FeeVoucher'
import Admission from './Admission'
import ExamSchedule from './ExamSchedule'
import ExamResult from './ExamResult'
import FeeProccessing from './FeeProccessing'
import Dashboard from './Dashboard';
import { useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';


const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    })
);


const dropdowns = [
    {
        name: 'Profile',
        icon: <CgProfile />,
        items: [
            { name: 'Profile Details', route: 'profile/profile-details' },
        ],
    },
    {
        name: 'Student',
        icon: <PiStudentBold />,
        items: [
            { name: 'Add Student', route: 'student/add-student' },
            { name: 'View Student', route: 'student/view-student' }
        ],
    },
    {
        name: 'Teacher',
        icon: <GiTeacher />,

        items: [
            { name: 'Add Teacher', route: 'teacher/add-teacher' },
            { name: 'View Teacher', route: 'teacher/view-teacher' }
        ],
    },
    {
        name: 'Subjects',
        icon: <FaBook />,

        items: [
            { name: 'Add Subjects', route: 'subjects/add-subjects' },
            { name: 'View Subjects', route: 'subjects/view-subjects' },
        ],
    },
    {
        name: 'School',
        icon: <FaSchool />,

        items: [
            { name: 'School Registration', route: 'school/school-registration' },
            { name: 'View Schools', route: 'school/view-school' },
        ],
    },
    {
        name: 'Syllabus',
        icon: <MdContentPaste />,

        items: [
            { name: 'Syllabus Form', route: 'syllabus/syllabus-form' },
            { name: 'Syllabus List', route: 'syllabus/syllabus-list' },
        ],
    },
    {
        name: 'Class',
        icon: <SiGoogleclassroom />,

        items: [
            { name: 'Class Form', route: 'class/class-form' },
            { name: 'Class List', route: 'class/class-list' },
        ],
    },
    {
        name: 'Fees',
        icon: <FaMoneyBillAlt />,

        items: [
            { name: 'Fee Structure', route: 'fee/fee-structure' },
            { name: 'Fee Submission', route: 'fee/fee-submission' }
        ],
    },
    {
        name: 'Admission',
        icon: <FaUniversalAccess />,

        items: [
            { name: 'Admission', route: 'admission/admission' },
            { name: 'View Admissions', route: 'admission/view-admission' },
        ],
    },
    {
        name: 'Exam',
        icon: <PiExamBold />,

        items: [
            { name: 'Exam Schedule', route: 'exam/exam-schedule' },
            { name: 'Exam Result', route: 'exam/exam-result' },
        ],
    },
    
];

export default function DashboardLayout() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openDropdown, setOpenDropdown] = React.useState({}); // State to track open/close for dropdowns
    const location = useLocation();
    useEffect(() => {
        location.pathname === "/" && navigate('/dashboard')
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDropdownToggle = (index) => {
        setOpenDropdown((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{
                backgroundColor: '#008080'
            }} position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[{ marginRight: 5 }, open && { display: 'none' }]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{
                        fontFamily: "Montserrat"
                    }} variant="h6" noWrap component="div">
                        LMS
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer sx={{
                backgroundColor: "#008080"
            }} variant="permanent" open={open}>
                <DrawerHeader sx={{
                    backgroundColor: "#008080"
                }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{
                    fontFamily: "Poppins-serif",
                }}>
                    {dropdowns.map((dropdown, index) => (
                        <div sx={{
                            fontFamily: "Poppins-serif"
                        }} key={index}>
                            <ListItemButton onClick={() => handleDropdownToggle(index)}>
                                <ListItemIcon sx={{ fontSize: 25 }} >{dropdown.icon}</ListItemIcon>
                                <ListItemText sx={{
                                    fontFamily: "Poppins-serif"
                                }} primary={dropdown.name} />
                            </ListItemButton>
                            <Collapse sx={{
                                fontFamily: "Poppins-serif"
                            }} in={openDropdown[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {dropdown.items.map((item, itemIndex) => (
                                        <ListItem key={itemIndex} disablePadding>
                                            <ListItemIcon sx={{ fontSize: 25, paddingLeft: "30px" }} >{dropdown.icon}</ListItemIcon>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(item.route);
                                                }}
                                            >
                                                <ListItemText sx={{
                                                    fontFamily: "Poppins-serif"
                                                }} primary={item.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}

                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <DrawerHeader />
                {/* <Navigate to="/dashboard" /> */}
                {/* <Routes>
                    <Route path='dashboard' element={<DashboardLayout />} >
                        <Route path='student/add-student' element={<AddStudent />} />
                        <Route path='student/view-student' element={<ViewStudent />} />
                        <Route path='student/update-student' element={<UpdateStudent />} />
                        <Route path='student/transfer-student' element={<TransferStudent />} />
                        <Route path='teacher/add-teacher' element={<AddTeacher />} />
                        <Route path='teacher/view-teacher' element={<ViewTeacher />} />
                        <Route path='teacher/update-teacher' element={<UpdateTeacher />} />
                        <Route path='teacher/teacher-allocation' element={<TeacherAllocation />} />
                        <Route path='subjects/add-subjects' element={<AddSubjects />} />
                        <Route path='subjects/view-subjects' element={<ViewSubjects />} />
                        <Route path='subjects/update-subjects' element={<UpdateSubjects />} />
                        <Route path='school/school-registration' element={<SchoolRegistration />} />
                        <Route path='school/view-school' element={<ViewSchools />} />
                        <Route path='syllabus/syllabus-form' element={<SyllabusForm />} />
                        <Route path='syllabus/syllabus-list' element={<SyllabusList />} />
                        <Route path='class/class-form' element={<ClassForm />} />
                        <Route path='class/class-list' element={<ClassList />} />
                        <Route path='fee/fee-structure' element={<FeeStructure />} />
                        <Route path='fee/fee-submission' element={<FeeSubmission />} />
                        <Route path='fee/fee-voucher' element={<FeeVoucher />} />
                        <Route path='fee/fee-proccessing' element={<FeeProccessing />} />
                        <Route path='admission/admission' element={<Admission />} />
                        <Route path='exam/exam-schedule' element={<ExamSchedule />} />
                        <Route path='exam/exam-result' element={<ExamResult />} />
                    </Route>
                </Routes> *}
                {/* <h2>LMS</h2> */}
                <Outlet />
            </Box>
        </Box>
    );
}
