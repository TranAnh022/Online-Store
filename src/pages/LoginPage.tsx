import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { ThemeProvider } from "@mui/material/styles";
import { LoginContainerStyle, TitleStyle, customTheme } from "../customizedCSS";
import { validationUserSchema } from "../validation";
import { useAppDispatch } from "../redux/configureStore";
import { fetchCurrentUser, userLoginAsync } from "../redux/actions/userActions";
import GoogleLogin from "../components/googleLogin/GoogleLogin";

function LoginPage() {
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: any) => {
    await dispatch(userLoginAsync(values));
    await dispatch(fetchCurrentUser());
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationUserSchema,
    onSubmit: handleSubmit,
  });

  return (
    <ThemeProvider theme={customTheme("dark")}>
      <Box sx={LoginContainerStyle}>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={TitleStyle}>Online Store</Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Unlock a world of endless shopping possibilities. Sign in and start
            exploring today!"
          </Typography>
          <Box>
            <Box
              sx={{
                background: "rgba(0, 0, 0, 0.5)",
                borderRadius: 4,
                padding: 3,
                "& .MuiTextField-root": { mb: 2 },
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>
                Login
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={formik.isSubmitting}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  disabled={formik.isSubmitting}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                  sx={{ mt: 2, width: "100%" }}
                >
                  {formik.isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
              <Typography variant="body2" sx={{ color: "white", mt: 2 }}>
                New to the Online Store?{" "}
                <Link href="/register">Create an account</Link>
              </Typography>
              <Typography variant="body2" sx={{ color: "white", mt: 2 }}>
                <GoogleLogin />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
