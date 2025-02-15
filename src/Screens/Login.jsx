import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    // alignSelf: "center",
    width: "90%",
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "400px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
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

export default function Login(props) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password).then(async (res) => {
            localStorage.setItem("uid", res.user.uid);
            const getData = await getDoc(doc(db, "users", res.user.uid));
            localStorage.setItem("userData", JSON.stringify(getData.data()));
            navigate("/dashboard");
        }).catch((err) => {
            if (err.code === "auth/user-not-found") {
                toast.error("No account found with this email.");
            } else if (err.code === "auth/wrong-password") {
                toast.error("Incorrect password. Please try again.");
            } else {
                toast.error("Login failed. Please check your details.");
            }
        });
    };

    const validateInputs = () => {
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage("");
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage("Password must be at least 6 characters long.");
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }

        return isValid;
    };

    return (
        <SignInContainer direction="column" sx={{
            // paddingLeft: "-20px",
            // justifyContent:"center"
        }}>
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        fontFamily: "Montserrat",
                        textAlign: "center",
                    }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent:"center",
                        width: "100%",
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel
                            sx={{
                                fontFamily: "Montserrat",
                            }} htmlFor="email">Email</FormLabel>
                        <TextField
                            sx={{
                                fontFamily: "Montserrat",
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={emailError ? "error" : "primary"}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel sx={{
                            fontFamily: "Montserrat",
                        }} htmlFor="password">Password</FormLabel>
                        <TextField
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? "error" : "primary"}
                        />
                    </FormControl>
                    <Button sx={{
                        fontFamily: "Montserrat",
                        bgcolor: "#008080",
                        ":hover": { bgcolor: "#004c4c" },
                    }} type="submit" fullWidth variant="contained">
                        Sign in
                    </Button>
                </Box>
                <Divider sx={{
                    fontFamily: "Montserrat",
                }}>or</Divider>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography sx={{ textAlign: "center", fontFamily: "Montserrat", }}>
                        Don&apos;t have an account?{" "}
                        <Link
                            onClick={() => navigate('/signup')}
                            variant="body2"
                            sx={{
                                fontFamily: "Montserrat",
                                color: "#008080",
                                cursor: "pointer"
                            }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </SignInContainer>
    );
}
