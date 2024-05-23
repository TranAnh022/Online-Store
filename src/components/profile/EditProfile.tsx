import React, { useEffect } from "react";
import { Container, TextField, Button, Grid, Avatar, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { useFormik } from "formik";
import { fetchUserId, updateUserAsync } from "../../redux/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { validationUserUpdateSchema } from "../../validation";

const EditProfile: React.FC = () => {
  const { userUpdate } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(fetchUserId(id));
  }, [id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userUpdate?.name || "",
      email: userUpdate?.email || "",
      avatar: userUpdate?.avatar || "",
      password: "",
    },
    validationSchema: validationUserUpdateSchema,
    onSubmit: async (values) => {
      if (userUpdate?.id && id) {
        await dispatch(updateUserAsync({ values, id }));
        navigate(`/profile`);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ padding: "7rem" }}>
      <Box display="flex" justifyContent="center" mb={2} position="relative">
        <Avatar
          alt="Profile Avatar"
          src={formik.values.avatar}
          sx={{ width: 56, height: 56 }}
        />
      </Box>
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              variant="outlined"
              fullWidth
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Avatar URL"
              name="avatar"
              variant="outlined"
              fullWidth
              value={formik.values.avatar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.avatar && Boolean(formik.errors.avatar)}
              helperText={formik.touched.avatar && formik.errors.avatar}
            />
          </Grid>
          <Grid item xs={12} display="flex" gap="1rem">
            <Button
              variant="outlined"
              color="warning"
              startIcon={<CancelIcon />}
              onClick={() => navigate(`/profile`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditProfile;
