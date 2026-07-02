import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h1" gutterBottom sx={{
          background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Konica Computers ERP
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
          A scalable e-commerce and enterprise resource planning platform built for the future.
        </Typography>
        <Button variant="contained" size="large" sx={{ mr: 2 }}>
          Shop Products
        </Button>
        <Button variant="outlined" size="large" color="secondary">
          Go to Dashboard
        </Button>
      </Box>

      <Grid container spacing={4}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Paper sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" gutterBottom>Feature {item}</Typography>
              <Typography variant="body2" color="text.secondary">
                Experience seamless integration and modern design aesthetics.
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
