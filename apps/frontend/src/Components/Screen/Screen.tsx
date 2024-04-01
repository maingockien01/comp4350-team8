import React from 'react';
import './Screen.css';
import {Container} from '@mui/material';

const Screen = ({children}: {children: React.ReactNode}) => {
  return (
    <Container className="screen--container">{children}</Container>
  );
};

export default Screen;
