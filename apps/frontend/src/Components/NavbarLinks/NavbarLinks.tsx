import {Link} from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import Button from '@mui/material/Button';

import './NavbarLinks.css';
import {links} from './links';

const NavbarLinks = () => {
  return (
    <Toolbar className='navbar_links--toolbar'>
      {
        // Map through navbarScreens and render each as a button
        links.map((screen) => (
          <Link to={screen.path} key={screen.name}>
            <Button
              variant="contained"
              className='navbar_links--button'
            >
              {screen.name}
            </Button>
          </Link>
        ))
      }
    </Toolbar>
  );
};

export default NavbarLinks;
