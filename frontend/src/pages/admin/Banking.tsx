import React from 'react';
import { Box, Typography, Paper, Grid, TextField, InputAdornment, Button } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckIcon from '@mui/icons-material/Check';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const BankAccountForm: React.FC<{ title: string }> = ({ title }) => (
  <Paper sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
      <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 0.5, borderRadius: 1 }}>
        <AccountBalanceIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Fill in to add account</Typography>
      </Box>
    </Box>

    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Bank Name *</Typography>
      <TextField size="small" fullWidth placeholder="e.g. HDFC Bank, SBI, Cash" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
    </Box>
    
    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Account Number</Typography>
      <TextField size="small" fullWidth placeholder="e.g. 5545519000" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
    </Box>
    
    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>IFSC Code</Typography>
      <TextField size="small" fullWidth placeholder="e.g. KKHB0006582" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
    </Box>

    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Opening Balance (₹)</Typography>
      <TextField 
        size="small" 
        fullWidth 
        placeholder="0.00" 
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon sx={{ fontSize: 16 }} /></InputAdornment>,
          }
        }}
        sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} 
      />
    </Box>

    <Button variant="contained" startIcon={<CheckIcon />} sx={{ bgcolor: '#00897b', color: '#fff', mt: 1, '&:hover': { bgcolor: '#00796b' } }}>
      Save Bank Account
    </Button>
  </Paper>
);

const Banking: React.FC = () => {
  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>Banking & Accounts</Typography>

      <Paper sx={{ p: 2, mb: 4, borderRadius: 2, border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'flex-start', gap: 2, bgcolor: 'rgba(0, 229, 255, 0.02)' }}>
        <AccountBalanceIcon sx={{ color: 'primary.main', mt: 0.5 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Set up your bank accounts</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Fill in the cards below to add your Cash account, bank accounts, or any payment wallet. Balances will auto update with every transaction.</Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <BankAccountForm title="BANK ACCOUNT 1" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <BankAccountForm title="BANK ACCOUNT 2" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <BankAccountForm title="BANK ACCOUNT 3" />
            </Grid>
          </Grid>
        </Grid>
        
        <Grid size={{ xs: 12, lg: 3 }}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 0.5, mb: 'auto' }}>RECORD TRANSACTION</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', flexGrow: 1, textAlign: 'center', px: 2 }}>
              <CurrencyRupeeIcon sx={{ fontSize: 40, mb: 2, opacity: 0.2 }} />
              <Typography variant="body2">Add a bank account first to start recording transactions.</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banking;
