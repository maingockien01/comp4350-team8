import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button, { ButtonProps } from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { styled } from '@mui/material/styles';
import { brown } from '@mui/material/colors';
import { Link } from "react-router-dom";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: 'white',
    fontWeight: 500,
    backgroundColor: "#F5A800",
    width: '200px',
    '&:hover': {
      backgroundColor: brown[500],
    },
    '&:active': {
        backgroundColor: brown[600],
      },
    '&:focus': {
        backgroundColor: "#502C1E",
    },
  }));

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    
    
    return (
      <AppBar sx={{backgroundColor:"white", boxShadow:'none'}} position="static">
        <Container maxWidth="lg">
            <Stack spacing={1} sx={{mt:3}}>
                <Toolbar disableGutters>
                    <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color:"black", fontSize:80}} />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                        mr: 2,
                        ml:2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 900,
                        fontSize:40,
                        letterSpacing: '.3rem',
                        color: "#502C1E",
                        textDecoration: 'none',
                        }}
                    >
                        Schedule Master
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>
                    <Box sx={{ flexGrow:0  }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                           <Typography>Jack Nguyen</Typography><Avatar alt="Remy Sharp" src="" sx={{ml: 2}}/> 
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
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
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Toolbar>
                <Divider sx={{bgcolor:"black"}}></Divider>
                <Toolbar sx={{justifyContent:"space-between"}}>
                    <Link to="/">
                      <ColorButton variant="contained">Home</ColorButton>
                    </Link>
                    <Link to='/lookup'>
                      <ColorButton variant="contained">Courses Look Up</ColorButton>
                    </Link>
                    <Link to="/add-drop">
                      <ColorButton variant="contained">Add/Drop Courses</ColorButton>
                    </Link>
                    <Link to="/calendar">
                      <ColorButton variant="contained">Calendar</ColorButton>
                    </Link>
                    <Link to="/roadmap">
                      <ColorButton variant="contained">Roadmap</ColorButton>
                    </Link>
                </Toolbar>
            </Stack>
        </Container>
      </AppBar>
    );
};

export default Navbar;
