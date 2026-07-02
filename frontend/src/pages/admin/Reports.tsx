import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab, TextField, Button, Grid } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BarChartIcon from '@mui/icons-material/BarChart';

const Reports: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>Reports</Typography>

      <Paper sx={{ mb: 3, border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
        <Tabs 
          value={tab} 
          onChange={(e, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 48, '& .MuiTab-root': { minHeight: 48, py: 0 } }}
        >
          <Tab label="Daily Sales" />
          <Tab label="GST Report" />
          <Tab label="P&L Report" />
          <Tab label="Inventory Valuation" />
          <Tab label="Date Wise Purchase" />
          <Tab label="Month Wise Purchase" />
          <Tab label="Date Wise Sales" />
          <Tab label="Month Wise Sales" />
          <Tab label="Company Expenses" />
        </Tabs>
      </Paper>

      {tab === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>From</Typography>
              <TextField type="date" size="small" defaultValue="2026-05-29" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>To</Typography>
              <TextField type="date" size="small" defaultValue="2026-06-27" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" size="small" startIcon={<AssessmentIcon />} sx={{ color: '#4caf50', borderColor: 'rgba(76, 175, 80, 0.5)' }}>Excel</Button>
              <Button variant="outlined" size="small" startIcon={<PictureAsPdfIcon />} sx={{ color: '#f44336', borderColor: 'rgba(244, 67, 54, 0.5)' }}>PDF</Button>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>TOTAL SALES</Typography>
                  <DescriptionIcon sx={{ color: '#4caf50', fontSize: 16 }} />
                </Box>
                <Typography variant="h5" sx={{ color: '#4caf50', fontWeight: 700 }}>₹0.00</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>INVOICE COUNT</Typography>
                  <DescriptionIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                </Box>
                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>0</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>TOTAL CGST</Typography>
                  <DescriptionIcon sx={{ color: '#ffb300', fontSize: 16 }} />
                </Box>
                <Typography variant="h5" sx={{ color: '#ffb300', fontWeight: 700 }}>₹0.00</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>TOTAL SGST</Typography>
                  <DescriptionIcon sx={{ color: '#ffb300', fontSize: 16 }} />
                </Box>
                <Typography variant="h5" sx={{ color: '#ffb300', fontWeight: 700 }}>₹0.00</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Daily Sales Trend</Typography>
            <Box sx={{ height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              <BarChartIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2">No sales data for this period.</Typography>
            </Box>
          </Paper>

          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ display: 'flex', minWidth: 800, p: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'text.secondary' }}>
                <Typography variant="caption" sx={{ flex: 1, fontWeight: 600 }}>DATE</Typography>
                <Typography variant="caption" sx={{ flex: 2, fontWeight: 600, textAlign: 'center' }}>INVOICES</Typography>
                <Typography variant="caption" sx={{ flex: 2, fontWeight: 600, textAlign: 'right' }}>TOTAL SALES</Typography>
                <Typography variant="caption" sx={{ flex: 1.5, fontWeight: 600, textAlign: 'right' }}>CGST</Typography>
                <Typography variant="caption" sx={{ flex: 1.5, fontWeight: 600, textAlign: 'right' }}>SGST</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, color: 'text.secondary' }}>
                <BarChartIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                <Typography variant="body2">No sales data for the selected period.</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Reports;
