import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab, Button, Skeleton } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SyncIcon from '@mui/icons-material/Sync';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CheckIcon from '@mui/icons-material/Check';

const Financial: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>Financial Statements</Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 2 }}>
            <TrendingUpIcon sx={{ color: '#2196f3', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Financial Statements</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Trial balance, balance sheet and financial position overview.</Typography>
          </Box>
        </Box>
        <Button variant="outlined" size="small" startIcon={<SyncIcon />} sx={{ color: 'primary.main', borderColor: 'rgba(0, 229, 255, 0.5)' }}>
          Sync
        </Button>
      </Box>

      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', mb: 3 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Trial Balance" />
          <Tab label="P&L Account" />
          <Tab label="Balance Sheet" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Button variant="outlined" size="small" startIcon={<AddIcon />} sx={{ color: 'primary.main', borderColor: 'rgba(0, 229, 255, 0.5)' }}>
              Add Entry
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" size="small" startIcon={<AssessmentIcon />} sx={{ color: '#4caf50', borderColor: 'rgba(76, 175, 80, 0.5)' }}>Excel</Button>
              <Button variant="outlined" size="small" startIcon={<PictureAsPdfIcon />} sx={{ color: '#f44336', borderColor: 'rgba(244, 67, 54, 0.5)' }}>PDF</Button>
            </Box>
          </Box>

          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Trial Balance</Typography>
              <Typography variant="caption" sx={{ color: '#4caf50', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
                <CheckIcon sx={{ fontSize: 14 }} /> Balanced
              </Typography>
            </Box>

            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ display: 'flex', minWidth: 800, p: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'text.secondary' }}>
                <Typography variant="caption" sx={{ flex: 3, fontWeight: 600 }}>ACCOUNT</Typography>
                <Typography variant="caption" sx={{ flex: 1, fontWeight: 600, textAlign: 'right' }}>DEBIT</Typography>
                <Typography variant="caption" sx={{ flex: 1, fontWeight: 600, textAlign: 'right' }}>CREDIT</Typography>
              </Box>

              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[...Array(4)].map((_, i) => (
                  <Box key={i} sx={{ display: 'flex', minWidth: 800, alignItems: 'center' }}>
                    <Box sx={{ flex: 3 }}>
                      <Skeleton variant="rounded" width="30%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <Skeleton variant="rounded" width="40%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <Skeleton variant="rounded" width="40%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1, fontStyle: 'italic' }}>
            Reference format - add transactions to see live data
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Financial;
