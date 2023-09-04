import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email-id Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password Required"),
});

const Login = () => {
  // const selectToken = (state) => state.auth.token;
  // const selectResponseData = (state) => state.auth.responseData;
  // const dispatch = useDispatch();
  // const token = useSelector(selectToken);
  // const responseData = useSelector(selectResponseData);
  // const token = useSelector(selectToken);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    // onSubmit: (values) => {
    //   dispatch(userLogin(values));
    //   setTimeout(() => {
    //     console.log(values);
    //   }, 1000);
    // },
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
              <p style={{ color: "red", fontSize: "16px", marginTop: "-20px" }}>
                {formik.errors.email}
              </p>
            )}
            <TextField
              id="password"
              name="password"
              type="password"
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
              }}
            />
            <p style={{ color: "red", fontSize: "16px", marginTop: "10px" }}>
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
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
