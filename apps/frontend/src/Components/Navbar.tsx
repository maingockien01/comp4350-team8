import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {getTokenFromCookie} from '../Utils/CookieFunctions';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import NavbarLinks from './NavbarLinks';

const settings = ['Profile', 'Logout'];

/**
 * Represents a styled button component with custom color and hover effects.
 */

/**
 * Represents the function signature for the handleLogout function.
 */
interface HandleLogoutFunction {
  (): void;
}

const Navbar = (props: {handleLogout: HandleLogoutFunction}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');

  /**
   * Retrieves user information from the REST API.
   * If the request is successful, sets the username.
   * If the request fails, navigates to the login page.
   * @return {Promise<void>}
   * A promise that resolves when the user information is retrieved.
   */
  const getUserInfo = async (): Promise<void> => {
    try {
      const res = await axios.get('rest-api/profile', {
        headers: {Authorization: 'Bearer ' + getTokenFromCookie()},
      });
      if (res.data.status === 'success') {
        setUsername(res.data.user.username);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handles opening the user menu.
   * @param {React.MouseEvent<HTMLElement>} event - The click event.
   */
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  /**
   * Handles closing the user menu.
   */
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /**
   * Handles clicking on a menu item.
   * @param {string} menuItem - The selected menu item.
   */
  const handleOnClickMenuItem = (menuItem: string) => {
    if (menuItem == 'Profile') {
      navigate('/profile');
    } else if (menuItem == 'Logout') {
      props.handleLogout();
    }
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AppBar
      sx={{backgroundColor: 'white', boxShadow: 'none'}}
      position="static"
    >
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{mt: 3}}>
          <Toolbar disableGutters>
            <AutoStoriesIcon
              sx={{
                display: {xs: 'none', md: 'flex'},
                mr: 1,
                color: 'black',
                fontSize: 80,
              }}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                ml: 2,
                display: {xs: 'none', md: 'flex'},
                fontFamily: 'monospace',
                fontWeight: 900,
                fontSize: 40,
                letterSpacing: '.3rem',
                color: '#502C1E',
                textDecoration: 'none',
              }}
            >
              Schedule Updated
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: {xs: 'none', md: 'flex'},
              }}
            ></Box>
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Typography>{username}</Typography>
                  <Avatar alt="Remy Sharp" src="" sx={{ml: 2}} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleOnClickMenuItem(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
          <Divider sx={{bgcolor: 'black'}}></Divider>
          <NavbarLinks />
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
