import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Income: React.FC = () => {
  return (
    <Box sx={{ pb: 4, height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>Income</Typography>

      <Paper sx={{ p: 2, mb: 4, borderRadius: 2, border: '1px solid rgba(0, 229, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'rgba(255,255,255,0.02)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ bgcolor: 'rgba(0, 229, 255, 0.1)', p: 1, borderRadius: 2, display: 'flex' }}>
            <ArrowUpwardIcon sx={{ color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 0.5 }}>INCOME MANAGEMENT</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Record and track all income transactions</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Total Positive Balance</Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, lineHeight: 1 }}>₹0.00</Typography>
          </Box>
          <Button variant="contained" color="primary" sx={{ color: '#000', fontWeight: 600 }}>
            Add Income
          </Button>
        </Box>
      </Paper>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
        <CurrencyRupeeIcon sx={{ fontSize: 40, mb: 2, opacity: 0.2 }} />
        <Typography variant="body2">Select an account to view transactions</Typography>
      </Box>
    </Box>
  );
};

export default Income;
