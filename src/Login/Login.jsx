import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userLogin } from "./AuthSlice";


// const ErrorText = styled(Box)(({ theme }) => ({
//   color: "red",
//   marginTop: theme.spacing(1),
// }));
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email-id Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password Required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const selectToken = (state) => state.auth.token;
  const selectResponseData = (state) => state.auth.responseData;
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const responseData = useSelector(selectResponseData);
  const navigate = useNavigate()
  // console.log(responseData,"responnseeeeee");
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        const action = await dispatch(userLogin(values));
                if(action.payload  === 'You have entered an invalid email or password') {
                  setLoginError(action.payload)
                }else {
                  navigate("/cardcomponent")
                }
        }
  });
  

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "60px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginBottom: "10px", marginTop: "5px" }}>Log in</h3>
          
          {loginError && ( // Display the error message conditionally
            <p style={{ color: "red", fontSize: "16px", marginBottom: "10px" }}>
              {loginError}
            </p>
          )}
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "450px",
              borderRadius: "30px",
            }}
          >
            <TextField
              id="email"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              autoComplete="current-email"
              style={{
                marginBottom: "30px",
                width: "100%",
                marginTop: "15px",
                borderRadius: "30px",
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              InputProps={{
                sx: {
                  borderColor: "blue",
                  "&:focus": {
                    borderColor: "blue",
                  },
                  "&:hover": {
                    backgroundColor: "#FAFAFA",
                  },
                },
              }}
            />
            {formik.touched.email && formik.errors.email && (
              <p
                style={{
                  color: "red",
                  fontSize: "16px",
                  marginTop: "-20px",
                }}
              >
                {formik.errors.email}
              </p>
            )}
            <TextField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              autoComplete="current-password"
              variant="outlined"
              style={{ width: "100%", marginTop: "10px" }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              label="Password"
              InputProps={{
                sx: {
                  borderColor: "blue",
                  "&:focus": {
                    borderColor: "blue",
                  },
                  "&:hover": {
                    backgroundColor: "#FAFAFA",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <p
              style={{ color: "red", fontSize: "16px", marginTop: "10px" }}
            >
              {formik.errors.password}
            </p>
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: "10px", marginTop: "25px" }}
            >
              Login now
            </Button>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
            ></Typography>
          </form>
          <div style={{display:"flex", paddingTop:"15px", justifyContent:"space-between", width:"100%"}}>
          <p style={{ color: "grey" }}>
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/registrationpage"
              style={{ textDecoration: "none" }}
            >
              Register
            </Link>
          </p>
          <p style={{ color: "grey", paddingTop: "0px" }}>
            <Link
              component={RouterLink}
              to="/forgotpassword"
              style={{ textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </p>
          </div>
          
        </Paper>
      </Box>
    </div>
  );
};

export default Login;