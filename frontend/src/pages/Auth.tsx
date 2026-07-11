import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Tabs, Tab, Paper } from '@mui/material';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MemoryIcon from '@mui/icons-material/Memory';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', bgcolor: '#050505' }}>
      {/* Centered wrapper with gap on sides */}
      <Box sx={{ 
        display: 'flex', 
        width: '100%', 
        maxWidth: 1400, 
        mx: 'auto',
        height: '100%',
      }}>
        {/* Left Panel */}
        <Box sx={{ 
          flex: 1, 
          bgcolor: '#000000', 
          p: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          borderRight: '1px solid rgba(255,255,255,0.05)' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 'auto' }}>
            <MemoryIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', letterSpacing: 1 }}>Konica Computers</Typography>
          </Box>

          <Box sx={{ maxWidth: 480 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 2 }}>
              Your complete retail operating system.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 6 }}>
              Billing, inventory, accounts, and analytics — all in one place.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0, 229, 255, 0.1)', height: 'fit-content' }}>
                  <ShieldOutlinedIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: 'white' }}>Role-based access</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Admin • Cashier • Inventory • Accountant</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0, 229, 255, 0.1)', height: 'fit-content' }}>
                  <BarChartOutlinedIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: 'white' }}>Real-time analytics</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Sales, revenue, GST reports at a glance</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0, 229, 255, 0.1)', height: 'fit-content' }}>
                  <Inventory2OutlinedIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: 'white' }}>Inventory & serial tracking</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>SKU, barcode, warranty management</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
            {['GST Compliant', 'CGST + SGST', 'Barcode Scanner', 'Serial Tracking', 'INR Currency'].map((badge) => (
              <Box key={badge} sx={{ px: 2, py: 0.5, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5, fontSize: '0.75rem', color: 'text.secondary' }}>
                {badge}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Panel */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#050505' }}>
          <Paper sx={{ width: '100%', maxWidth: 400, bgcolor: '#0a0a0a', p: 0, overflow: 'hidden', borderRadius: 3 }}>
            <Tabs value={tab} onChange={(_e, v) => setTab(v)} variant="fullWidth" sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <Tab label="Register" />
              <Tab label="Sign In" />
            </Tabs>
            
            <Box component="form" onSubmit={handleLogin} sx={{ p: 4 }}>
              {tab === 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Full Name</Typography>
                  <TextField fullWidth placeholder="Your full name" variant="outlined" size="small" />
                </Box>
              )}
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Email</Typography>
                <TextField fullWidth placeholder="you@example.com" variant="outlined" size="small" />
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Password</Typography>
                <TextField fullWidth type="password" placeholder="Minimum 6 characters" variant="outlined" size="small" />
              </Box>

              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ py: 1.5, fontWeight: 700, fontSize: '1rem', color: 'black' }}>
                {tab === 0 ? 'Register' : 'Sign In'}
              </Button>

              <Typography align="center" variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
                {tab === 0 ? 'Already have an account? ' : "Don't have an account? "}
                <Typography component="span" sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600 }} onClick={() => setTab(tab === 0 ? 1 : 0)}>
                  {tab === 0 ? 'Sign In' : 'Register'}
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
