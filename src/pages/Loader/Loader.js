import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const backdropStyle = {
  zIndex: (theme) => theme.zIndex.drawer + 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
};

const Loading = ({ open }) => {
  return (
    <Backdrop sx={backdropStyle} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;