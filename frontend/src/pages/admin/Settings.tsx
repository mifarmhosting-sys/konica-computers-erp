import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab, TextField, Button, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SecurityIcon from '@mui/icons-material/Security';
import TimelineIcon from '@mui/icons-material/Timeline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';

const Settings: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ pb: 8 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>Settings</Typography>

      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', mb: 3 }}>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
          <Tab label="General Settings" sx={{ color: tab === 0 ? '#00e5ff !important' : 'text.secondary' }} />
          <Tab label="Master Setup" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Business Information Card */}
          <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 1.5 }}>
                <BusinessIcon sx={{ color: '#2196f3', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Business Information</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Your business details appear on all invoices and documents.</Typography>
              </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Business Name</Typography>
                <TextField size="small" fullWidth defaultValue="Konica Computers" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>GST Number (GSTIN)</Typography>
                <TextField size="small" fullWidth defaultValue="19ALGPQ2790L1ZP" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>15-character GSTIN</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Phone</Typography>
                <TextField size="small" fullWidth defaultValue="+919674601387" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Address</Typography>
                <TextField size="small" fullWidth defaultValue="75 RAJ KRISHNA CHATTERJEE ROAD KASBA KOLKATA 700042" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" sx={{ bgcolor: '#00897b', color: '#fff', '&:hover': { bgcolor: '#00796b' } }}>Save Business Info</Button>
            </Box>
          </Paper>

          {/* Invoice Settings Card */}
          <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 1.5 }}>
                <ReceiptLongIcon sx={{ color: '#2196f3', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Invoice Settings</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Configure invoice numbering and default stock thresholds.</Typography>
              </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Invoice Prefix</Typography>
                <TextField size="small" fullWidth defaultValue="KC-" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>e.g. KC- → KC-0001</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Low Stock Default Threshold</Typography>
                <TextField size="small" fullWidth type="number" defaultValue="2" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>Alert when stock falls below this number</Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" sx={{ bgcolor: '#00897b', color: '#fff', '&:hover': { bgcolor: '#00796b' } }}>Save Invoice Settings</Button>
            </Box>
          </Paper>

          {/* User & Role Management Card */}
          <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 1.5 }}>
                <SupervisorAccountIcon sx={{ color: '#2196f3', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>User & Role Management</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Manage user roles. Only admins can assign roles.</Typography>
              </Box>
            </Box>

            <Box sx={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', bgcolor: 'rgba(255,255,255,0.02)', p: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="caption" sx={{ flex: 2, color: 'text.secondary' }}>Current User</Typography>
                <Typography variant="caption" sx={{ flex: 1, color: 'text.secondary', textAlign: 'center' }}>Current Role</Typography>
                <Typography variant="caption" sx={{ flex: 1, color: 'text.secondary', textAlign: 'center' }}>Status</Typography>
              </Box>
              <Box sx={{ display: 'flex', p: 1.5, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ flex: 2 }}>Logged-in Principal</Typography>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', px: 2, py: 0.5, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Guest</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 600 }}>Active</Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ mt: 2, p: 1.5, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1, border: '1px solid rgba(255,255,255,0.02)' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                <span style={{ fontWeight: 700, color: '#fff' }}>Note:</span> To assign a role to another principal, use the <code style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>assignCallerUserRole(principal, role)</code> backend call.
              </Typography>
            </Box>
          </Paper>

          {/* Role Permissions Card */}
          <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 1.5 }}>
                <SecurityIcon sx={{ color: '#2196f3', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Role Permissions</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Pages each role can access in this system.</Typography>
              </Box>
            </Box>

            <Box sx={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', bgcolor: 'rgba(255,255,255,0.02)', p: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="caption" sx={{ flex: 2, color: 'text.secondary' }}>Page / Module</Typography>
                <Typography variant="caption" sx={{ flex: 1, color: '#e040fb', textAlign: 'center', fontWeight: 600 }}>Admin</Typography>
                <Typography variant="caption" sx={{ flex: 1, color: '#00e5ff', textAlign: 'center', fontWeight: 600 }}>User</Typography>
                <Typography variant="caption" sx={{ flex: 1, color: '#ff9800', textAlign: 'center', fontWeight: 600 }}>Guest</Typography>
              </Box>
              
              {[
                { name: 'Dashboard', admin: true, user: true, guest: false },
                { name: 'Billing & POS', admin: true, user: true, guest: false },
                { name: 'Inventory', admin: true, user: true, guest: false },
                { name: 'Customers', admin: true, user: true, guest: false },
                { name: 'Invoices', admin: true, user: true, guest: false },
                { name: 'Reports', admin: true, user: false, guest: false },
                { name: 'Settings', admin: true, user: false, guest: false },
              ].map((row, i) => (
                <Box key={i} sx={{ display: 'flex', p: 1.5, borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.02)' : 'none', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ flex: 2 }}>{row.name}</Typography>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    {row.admin ? <CheckIcon sx={{ color: '#4caf50', fontSize: 16 }} /> : <CloseIcon sx={{ color: '#f44336', fontSize: 16 }} />}
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    {row.user ? <CheckIcon sx={{ color: '#4caf50', fontSize: 16 }} /> : <CloseIcon sx={{ color: '#f44336', fontSize: 16 }} />}
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    {row.guest ? <CheckIcon sx={{ color: '#4caf50', fontSize: 16 }} /> : <CloseIcon sx={{ color: '#f44336', fontSize: 16 }} />}
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Activity Log Card */}
          <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 1.5 }}>
                <TimelineIcon sx={{ color: '#2196f3', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Activity Log</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Last 50 system actions and changes.</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, color: 'text.secondary' }}>
              <TimelineIcon sx={{ fontSize: 40, mb: 1, opacity: 0.2 }} />
              <Typography variant="body2">No activity recorded yet</Typography>
            </Box>
          </Paper>

          {/* System Information Card */}
          <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 1.5 }}>
                <InfoOutlinedIcon sx={{ color: '#2196f3', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>System Information</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Real-time counts from backend store.</Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 1 }}>
                    <Inventory2OutlinedIcon sx={{ color: '#2196f3', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>2</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Total Products</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'rgba(0, 229, 255, 0.1)', p: 1, borderRadius: 1 }}>
                    <PeopleOutlinedIcon sx={{ color: '#00e5ff', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>0</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Total Customers</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', p: 1, borderRadius: 1 }}>
                    <RequestQuoteOutlinedIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>0</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Total Invoices</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

        </Box>
      )}
    </Box>
  );
};

export default Settings;
