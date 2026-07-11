import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Paper, CircularProgress, Alert, Chip
} from '@mui/material';
import { 
  LocalMall as RevenueIcon, 
  TrendingUp as TrendingUpIcon,
  AccountBalanceWallet as CashIcon,
  WarningAmber as WarningIcon,
  People as PeopleIcon,
  ReceiptLong as ReceiptIcon,
  FlashOn as FlashIcon,
  Assessment as AssessmentIcon,
  Inventory2 as Inventory2Icon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../../services/api';

interface DashboardStats {
  total_revenue: number;
  total_cost_of_goods: number;
  total_expenses: number;
  net_profit: number;
  month_label: string;
}

const chartData = [
  { name: 'Jun', Revenue: 200000, Profit: 25000 },
  { name: 'Jul', Revenue: 250000, Profit: 30000 },
  { name: 'Aug', Revenue: 230000, Profit: 28000 },
  { name: 'Sep', Revenue: 300000, Profit: 40000 },
  { name: 'Oct', Revenue: 380000, Profit: 45000 },
  { name: 'Nov', Revenue: 350000, Profit: 42000 },
  { name: 'Dec', Revenue: 500000, Profit: 60000 },
  { name: 'Jan', Revenue: 350000, Profit: 42000 },
  { name: 'Feb', Revenue: 320000, Profit: 38000 },
  { name: 'Mar', Revenue: 360000, Profit: 40000 },
  { name: 'Apr', Revenue: 420000, Profit: 50000 },
  { name: 'May', Revenue: 210000, Profit: 22000 },
];

const TopCard = ({ title, value, icon, iconColor, iconBg, trend }: any) => (
  <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 0.5 }}>{title.toUpperCase()}</Typography>
      {trend ? (
        <Box sx={{ bgcolor: 'rgba(0, 229, 255, 0.1)', p: 0.5, borderRadius: 1, display: 'flex' }}>
           <TrendingUpIcon sx={{ fontSize: 16, color: '#00e5ff' }} />
        </Box>
      ) : (
        <Box sx={{ bgcolor: iconBg, p: 0.5, borderRadius: 1, display: 'flex' }}>
           {React.cloneElement(icon, { sx: { fontSize: 16, color: iconColor } })}
        </Box>
      )}
    </Box>
    <Typography variant="h5" sx={{ fontWeight: 700, color: iconColor === '#00e5ff' || iconColor === '#4caf50' || iconColor === '#f44336' ? iconColor : 'text.primary' }}>
      {value}
    </Typography>
  </Paper>
);

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/api/dashboard');
        setStats(res.data.data);
      } catch (err) {
        const errorResponse = err as { response?: { data?: { message?: string } } };
        setError(errorResponse.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !stats) {
    return <Alert severity="error">{error || 'Could not load data'}</Alert>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Dashboard</Typography>
      </Box>

      {/* Top 6 Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TopCard title="Today's Sales" value="₹0.00" icon={<RevenueIcon />} iconColor="#00e5ff" iconBg="rgba(0, 229, 255, 0.1)" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TopCard title="Month Revenue" value={formatCurrency(stats.total_revenue)} icon={<TrendingUpIcon />} iconColor="#00e5ff" iconBg="rgba(0, 229, 255, 0.1)" trend />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TopCard title="Profit / Loss" value={formatCurrency(stats.net_profit)} icon={<TrendingUpIcon />} iconColor="#00e5ff" iconBg="rgba(0, 229, 255, 0.1)" trend />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TopCard title="Cash Balance" value="₹0.00" icon={<CashIcon />} iconColor="#2196f3" iconBg="rgba(33, 150, 243, 0.1)" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TopCard title="Low Stock Items" value="0" icon={<WarningIcon />} iconColor="#ffb300" iconBg="rgba(255, 179, 0, 0.1)" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TopCard title="Pending Dues" value="₹0.00" icon={<PeopleIcon />} iconColor="#f44336" iconBg="rgba(244, 67, 54, 0.1)" />
        </Grid>
      </Grid>

      {/* Chart and GST */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
              <AssessmentIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Monthly Revenue — Last 12 Months</Typography>
            </Box>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="Revenue" fill="#2196f3" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="Profit" fill="#00e5ff" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
              <AssessmentIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Today's GST</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
              <Box sx={{ p: 2, bgcolor: 'rgba(33, 150, 243, 0.05)', borderRadius: 1.5, border: '1px solid rgba(33, 150, 243, 0.1)' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>CGST COLLECTED</Typography>
                <Typography variant="h5" sx={{ color: '#2196f3', fontWeight: 700, mt: 0.5 }}>₹0.00</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'rgba(0, 229, 255, 0.05)', borderRadius: 1.5, border: '1px solid rgba(0, 229, 255, 0.1)' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>SGST COLLECTED</Typography>
                <Typography variant="h5" sx={{ color: '#00e5ff', fontWeight: 700, mt: 0.5 }}>₹0.00</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>TOTAL GST</Typography>
                <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mt: 0.5 }}>₹0.00</Typography>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', mt: 2, display: 'block' }}>
              GST Rate: CGST 9% + SGST 9%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Invoices and Low Stock */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ReceiptIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Recent Invoices</Typography>
              </Box>
              <Chip label="0 shown" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'text.secondary', fontSize: '0.7rem', fontWeight: 600 }} />
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, opacity: 0.5 }}>
              <Inventory2Icon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="body2">No invoices yet. Create one from Billing.</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningIcon sx={{ color: '#ffb300', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Low Stock Alerts</Typography>
              </Box>
              <Chip label="2" size="small" sx={{ bgcolor: '#ffb300', color: '#000', fontSize: '0.75rem', fontWeight: 700 }} />
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <Box sx={{ py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Hp Pavilion</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Lap-Hp-001 • Reorder: 0</Typography>
                </Box>
                <Chip label="0 left" size="small" sx={{ bgcolor: 'rgba(244, 67, 54, 0.1)', color: '#f44336', border: '1px solid rgba(244, 67, 54, 0.2)', fontWeight: 700, fontSize: '0.7rem' }} />
              </Box>
              <Box sx={{ py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>KEYBOARD LAPTOP (90 DAYS WARRANTY)</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>LAP-HP-001 • Reorder: 5</Typography>
                </Box>
                <Chip label="1 left" size="small" sx={{ bgcolor: 'rgba(255, 179, 0, 0.1)', color: '#ffb300', border: '1px solid rgba(255, 179, 0, 0.2)', fontWeight: 700, fontSize: '0.7rem' }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Top 5 Fast Selling */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlashIcon sx={{ color: '#00e5ff', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Top 5 Fast-Selling Products Today</Typography>
              </Box>
              <Chip label="Live" size="small" sx={{ bgcolor: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', border: '1px solid rgba(0, 229, 255, 0.2)', fontWeight: 700, fontSize: '0.7rem' }} />
            </Box>
            <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
              <FlashIcon sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="body2">No sales data yet — products will appear here after your first sale.</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}