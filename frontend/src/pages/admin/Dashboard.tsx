import { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, CircularProgress, Alert, Avatar
} from '@mui/material';
import { 
  TrendingUp as RevenueIcon, 
  ShoppingCart as CogsIcon, 
  Receipt as ExpenseIcon, 
  AccountBalanceWallet as ProfitIcon 
} from '@mui/icons-material';
import api from '../../services/api';

interface DashboardStats {
  total_revenue: number;
  total_cost_of_goods: number;
  total_expenses: number;
  net_profit: number;
  month_label: string;
}

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

  // Helper to format values securely in Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Executive Dashboard</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Financial Summary for {stats.month_label}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Revenue Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">Revenue</Typography>
                <Avatar sx={{ bgcolor: '#e3f2fd', color: 'primary.main' }}>
                  <RevenueIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {formatCurrency(stats.total_revenue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* COGS Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">Cost of Goods</Typography>
                <Avatar sx={{ bgcolor: '#fff3e0', color: 'warning.main' }}>
                  <CogsIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {formatCurrency(stats.total_cost_of_goods)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Expenses Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">Expenses</Typography>
                <Avatar sx={{ bgcolor: '#ffebee', color: 'error.main' }}>
                  <ExpenseIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {formatCurrency(stats.total_expenses)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Net Profit Card (Dynamic Colors) */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card 
            elevation={3} 
            sx={{ 
              height: '100%', 
              borderRadius: 2,
              borderLeft: '6px solid',
              borderColor: stats.net_profit >= 0 ? 'success.main' : 'error.main' 
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">Net Profit</Typography>
                <Avatar sx={{ 
                  bgcolor: stats.net_profit >= 0 ? '#e8f5e9' : '#ffebee', 
                  color: stats.net_profit >= 0 ? 'success.main' : 'error.main' 
                }}>
                  <ProfitIcon />
                </Avatar>
              </Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: stats.net_profit >= 0 ? 'success.main' : 'error.main' 
                }}
              >
                {formatCurrency(stats.net_profit)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}