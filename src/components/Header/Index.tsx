import {
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
} from '@mui/material';

import { useState } from 'react';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { redirectDocument } from 'react-router-dom';

// interface HeaderProps {
//   userData: UserData | null;
// }

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout, loggedIn } = useFirebaseAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        w: '100%',
        bgcolor: '#202024',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/">
          <img
            src="/logo.svg"
            alt="Open Class Logo"
            width="254px"
            height="48px"
          />
        </Link>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            id="basic-menu-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{ discussãor: 'pointer' }}
            onClick={handleClick}
          >
            <img src="/user.svg" alt="Icone de Login" />
          </IconButton>
          <Menu
            id="basic-menu"
            aria-labelledby="basic-menu-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {loggedIn ? (
              <Box>
                <MenuItem
                  onClick={() => (window.location.href = '/minhaconta')}
                >
                  Minha Conta
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Box>
            ) : (
              <MenuItem onClick={() => redirectDocument('/login')}>
                Login
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Container>
    </Box>
  );
}
