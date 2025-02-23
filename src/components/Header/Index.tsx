import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";

import { PersonOutlineOutlined } from "@mui/icons-material";

import { useState } from "react";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";

// interface HeaderProps {
//   userData: UserData | null;
// }

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout, loggedIn } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAnalyzeClick = () => {
    navigate("/steps");
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        w: "100%",
        bgcolor: "#F2F2F2",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <img
            src="/logo/logo-agrotech.png"
            alt="Open Class Logo"
            width="64px"
            height="64px"
          />
        </Link>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={handleAnalyzeClick}
            sx={{
              marginRight: 2,
              bgcolor: "#428C5C",
              "&:hover": {
                bgcolor: "#277357",
              },
            }}
          >
            Realizar Análise
          </Button>
          <IconButton
            id="basic-menu-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{
              cursor: "pointer",
              color: "#428C5C",
              "&:hover": {
                color: "#277357",
              },
            }}
            onClick={handleClick}
          >
            <PersonOutlineOutlined sx={{ color: "#428C5C" }} />
          </IconButton>
          <Menu
            id="basic-menu"
            aria-labelledby="basic-menu-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {loggedIn ? (
              <Box>
                <MenuItem
                  onClick={() => (window.location.href = "/minhaconta")}
                >
                  Minha Conta
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Box>
            ) : (
              <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
            )}
          </Menu>
        </Box>
      </Container>
    </Box>
  );
}
