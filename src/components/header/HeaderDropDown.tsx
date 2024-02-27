import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useAppDispatch } from "../../redux/configureStore";
import { signOut } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import { UserType } from "../../types/type";

export default function FadeMenu(props: { user: UserType }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box display={"flex"} flexDirection={{ xs: "row" }} gap="1rem">
        <Avatar alt="avatar" src={`${props.user.avatar}`} />
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ color: "white",display:{xs:"none",md:"block"}}}
        >
          {props.user.name}
        </Button>
      </Box>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        {props.user.role === "admin" && (
          <MenuItem onClick={() => navigate("/create")}>
            Create new Product
          </MenuItem>
        )}
        <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
