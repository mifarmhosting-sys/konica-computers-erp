import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProtectedRoute: React.FC = () => {
  // Fixed: Added ': any' so TypeScript stays happy
  const { isAuthenticated, isLoading } = useSelector((state: any) => state.auth);

  if (isLoading) {
    return (
      // Fixed: Removed the hidden glitch box character before #000
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;