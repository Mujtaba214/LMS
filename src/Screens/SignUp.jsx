import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    // alignSelf: "center",
    width: "100%",
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    margin: "auto",
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    [theme.breakpoints.up("sm")]: {
        width: "450px",
    },
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

export default function SignUp(props) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const validateInputs = () => {
        if (!name || !email || !password) {
            toast.error("Required fields are missing!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Required fields are missing!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                const obj = { email, name };
                const Uid = res.user.uid;

                await setDoc(doc(db, "users", Uid), obj);

                toast.success("SignUp SuccessFully...", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                navigate("/login");
            })
            .catch((err) => {
                toast.error("Something went wrong!!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
    };

    return (
        <SignUpContainer direction="column" >
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: "100%",
                        fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        fontFamily: "Montserrat",
                        textAlign: "center",
                    }}
                >
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "100%",
                    }}
                >
                    <FormLabel sx={{ fontFamily: "Montserrat" }} htmlFor="name">
                        Full name
                    </FormLabel>
                    <TextField
                        sx={{ fontFamily: "Montserrat" }}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        name="name"
                        fullWidth
                        id="name"
                        placeholder="Jon Snow"
                        error={nameError}
                        helperText={nameErrorMessage}
                        color={nameError ? "error" : "primary"}
                    />

                    <FormLabel sx={{ fontFamily: "Montserrat" }} htmlFor="email">
                        Email
                    </FormLabel>
                    <TextField
                        sx={{ fontFamily: "Montserrat" }}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={emailError}
                        helperText={emailErrorMessage}
                        color={emailError ? "error" : "primary"}
                    />

                    <FormLabel sx={{ fontFamily: "Montserrat" }} htmlFor="password">
                        Password
                    </FormLabel>
                    <TextField
                        sx={{ fontFamily: "Montserrat" }}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? "error" : "primary"}
                    />
                    <Button
                        sx={{
                            fontFamily: "Montserrat",
                            bgcolor: "#008080",
                            textTransform: "none",
                        }}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Sign up
                    </Button>
                </Box>
                <Divider>
                    <Typography sx={{ color: "text.secondary", fontFamily: "Montserrat" }}>
                        or
                    </Typography>
                </Divider>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography sx={{ textAlign: "center", fontFamily: "Montserrat" }}>
                        Already have an account?{" "}
                        <Link
                            to='/login'
                            // onClick={() => {
                            //     navigate("/login");
                            // }}
                            variant="body2"
                            sx={{
                                fontFamily: "Montserrat",
                                color: "#008080",
                                cursor: "pointer",
                            }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </SignUpContainer>
    );
}
