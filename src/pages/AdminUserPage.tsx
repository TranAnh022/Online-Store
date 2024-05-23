import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Grid,
  Container,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { fetchAllUser, fetchCurrentUser } from "../redux/actions/userActions";
import NotFound from "../components/notFound/NotFound";

const UserCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const UserCardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

const AdminUserPage = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchAllUser());
    }
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [users, user, dispatch]);

  const handleExpandClick = (userId: string) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  const userList = users ? users.filter((u) => u.id !== user?.id) : [];
  if (user?.role === "User") return <NotFound message={"Only Admin Can Access This Page"}/>
    return (
      <Container sx={{ padding: "10rem" }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Grid container direction="column">
          {userList.map((user) => (
            <UserCard key={user.id}>
              <UserCardHeader>
                <Avatar
                  alt={user.name}
                  src={user.avatar}
                  sx={{ width: 64, height: 64, marginRight: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </CardContent>
                <Box display="flex">
                  <Button
                    onClick={() => handleExpandClick(user.id.toString())}
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    component={Link}
                    to={`/user/${user.id}`}
                    variant="contained"
                    color="secondary"
                    sx={{ marginRight: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    component={Link}
                    to={`/delete/${user.id}`}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </UserCardHeader>
              <Collapse
                in={expandedUserId === user.id.toString()}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography paragraph>Name: {user.name}</Typography>
                  <Typography paragraph>Email: {user.email}</Typography>
                  <Typography paragraph>Role: {user.role}</Typography>
                </CardContent>
              </Collapse>
            </UserCard>
          ))}
        </Grid>
      </Container>
    );
};

export default AdminUserPage;
