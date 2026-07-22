import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Tabs, Tab, Card, CardContent, Chip, Grid, Alert } from '@mui/material';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MemoryIcon from '@mui/icons-material/Memory';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/slices/authSlice';
import type { AppDispatch, RootState } from '../store';

const Auth: React.FC = () => {
  const [tab, setTab] = useState(1); // 1 = Sign In
  const [email, setEmail] = useState('admin@konicacomputers.store');
  const [password, setPassword] = useState('password');
  const [name, setName] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 1) { // Login
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/admin');
      }
    } else { // Register
      const resultAction = await dispatch(registerUser({ name, email, password, password_confirmation: password }));
      if (registerUser.fulfilled.match(resultAction)) {
        navigate('/admin');
      }
    }
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Left Column (Hidden on mobile, 50% width on desktop) */}
        <Grid 
          size={{ xs: 0, md: 6 }} 
          sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            flexDirection: 'column', 
            bgcolor: '#000000', 
            p: { md: 6, lg: 8 },
            borderRight: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 'auto' }}>
            <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, display: 'flex' }}>
              <MemoryIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', lineHeight: 1 }}>Konica Computers</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>ERP & Retail Management</Typography>
            </Box>
          </Box>

          {/* Hero Content */}
          <Box sx={{ maxWidth: 500, my: 'auto' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 2, letterSpacing: '-0.5px' }}>
              Your complete retail operating system.
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', mb: 6 }}>
              Billing, inventory, accounts, and analytics — all in one place.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0, 229, 255, 0.1)', display: 'flex' }}>
                  <ShieldOutlinedIcon sx={{ color: '#00e5ff', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: 'white', mb: 0.5 }}>Role-based access</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Admin • Cashier • Inventory • Accountant</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0, 229, 255, 0.1)', display: 'flex' }}>
                  <BarChartOutlinedIcon sx={{ color: '#00e5ff', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: 'white', mb: 0.5 }}>Real-time analytics</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Sales, revenue, GST reports at a glance</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0, 229, 255, 0.1)', display: 'flex' }}>
                  <Inventory2OutlinedIcon sx={{ color: '#00e5ff', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: 'white', mb: 0.5 }}>Inventory & serial tracking</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>SKU, barcode, warranty management</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Bottom Footer Chips */}
          <Box sx={{ mt: 'auto', display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {['GST Compliant', 'CGST + SGST', 'Barcode Scanner', 'Serial Tracking', 'INR Currency'].map((badge) => (
              <Chip 
                key={badge} 
                label={badge} 
                variant="outlined" 
                size="small" 
                sx={{ 
                  color: 'text.secondary', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  '& .MuiChip-label': { px: 2 }
                }} 
              />
            ))}
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid 
          size={{ xs: 12, md: 6 }} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            bgcolor: '#050505',
            p: 3
          }}
        >
          <Card elevation={0} sx={{ width: '100%', maxWidth: 420, bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <Tabs 
              value={tab} 
              onChange={(_e, v) => setTab(v)} 
              variant="fullWidth" 
              sx={{ 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                '& .MuiTab-root': { py: 2.5, color: 'text.secondary', textTransform: 'none', fontSize: '0.95rem' },
                '& .Mui-selected': { color: 'white !important', fontWeight: 600 },
                '& .MuiTabs-indicator': { backgroundColor: 'primary.main', height: 2 }
              }}
            >
              <Tab label="Register" />
              <Tab label="Sign In" />
            </Tabs>
            
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
                    {tab === 1 ? 'Welcome back' : 'Create an account'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {tab === 1 ? 'Sign in to your account' : 'Register for a new account'}
                  </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 0 }}>{error}</Alert>}

                {tab === 0 && (
                  <Box>
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, mb: 1, display: 'block' }}>Full Name</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Your full name" 
                      variant="outlined" 
                      size="small" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ 
                        '& .MuiOutlinedInput-root': { 
                          bgcolor: 'rgba(255,255,255,0.02)',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                          '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                        }
                      }}
                    />
                  </Box>
                )}
                
                <Box>
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, mb: 1, display: 'block' }}>Email</Typography>
                  <TextField 
                    fullWidth 
                    type="email"
                    placeholder="you@example.com" 
                    variant="outlined" 
                    size="small" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        bgcolor: 'rgba(255,255,255,0.02)',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      }
                    }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, mb: 1, display: 'block' }}>Password</Typography>
                  <TextField 
                    fullWidth 
                    type="password" 
                    placeholder={tab === 0 ? "Minimum 6 characters" : "Your password"} 
                    variant="outlined" 
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        bgcolor: 'rgba(255,255,255,0.02)',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                      }
                    }}
                  />
                </Box>

                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  disabled={isLoading}
                  sx={{ 
                    bgcolor: '#00e5ff', 
                    color: 'black', 
                    py: 1.5, 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    mt: 1,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#00b2cc'
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(0, 229, 255, 0.5)',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }
                  }}
                >
                  {isLoading ? 'Authenticating...' : (tab === 0 ? 'Register' : 'Sign In')}
                </Button>

                <Typography align="center" variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {tab === 0 ? 'Already have an account? ' : "Don't have an account? "}
                  <Typography 
                    component="span" 
                    sx={{ color: '#00e5ff', cursor: 'pointer', fontWeight: 600 }} 
                    onClick={() => setTab(tab === 0 ? 1 : 0)}
                  >
                    {tab === 0 ? 'Sign in' : 'Register'}
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
