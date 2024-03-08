import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { ThemeProvider } from "@mui/material/styles";
import { LoginContainerStyle, TitleStyle, customTheme } from "../customizedCSS";
import { validationRegisterSchema } from "../validation";
import { useAppDispatch } from "../redux/configureStore";
import { userRegisterAsync } from "../redux/actions/userActions";

function RegisterPage() {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: any) => {
    await dispatch(userRegisterAsync(values));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
    },
    validationSchema: validationRegisterSchema,
    onSubmit: handleSubmit,
  });

  return (
    <ThemeProvider theme={customTheme("dark")}>
      <Box sx={LoginContainerStyle} marginTop={"2rem"}>
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
            Join now for exclusive offers! Save big with up to 50% off as an
            online store member.
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
                Register
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  disabled={formik.isSubmitting}
                  InputLabelProps={{ style: { color: "white" } }}
                />
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
                  InputLabelProps={{ style: { color: "white" } }}
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
                  InputLabelProps={{ style: { color: "white" } }}
                />
                <TextField
                  fullWidth
                  id="avatar"
                  name="avatar"
                  label="Avatar"
                  value={formik.values.avatar}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                  helperText={formik.touched.avatar && formik.errors.avatar}
                  disabled={formik.isSubmitting}
                  InputLabelProps={{ style: { color: "white" } }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                  sx={{ mt: 2, width: "100%" }}
                >
                  {formik.isSubmitting ? "Registering..." : "Register"}
                </Button>
              </form>
              <Typography variant="body2" sx={{ color: "white", mt: 2 }}>
                Already have an account? <Link href="/login">Login here</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterPage;
