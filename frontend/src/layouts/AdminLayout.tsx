import React, { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MemoryIcon from '@mui/icons-material/Memory';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentWidth = collapsed ? 80 : drawerWidth;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/admin' },
    { text: 'Billing / POS', icon: <ReceiptIcon fontSize="small" />, path: '/admin/billing' },
    { text: 'Purchase', icon: <ShoppingBagIcon fontSize="small" />, path: '/admin/purchase' },
    { text: 'Inventory', icon: <Inventory2Icon fontSize="small" />, path: '/admin/inventory' },
    { text: 'Customers', icon: <PeopleIcon fontSize="small" />, path: '/admin/customers' },
    { text: 'Reports', icon: <AssessmentIcon fontSize="small" />, path: '/admin/reports' },
    { text: 'Sales', icon: <PointOfSaleIcon fontSize="small" />, path: '/admin/sales' },
    { text: 'Banking', icon: <AccountBalanceIcon fontSize="small" />, path: '/admin/banking' },
    { text: 'Income', icon: <TrendingUpIcon fontSize="small" />, path: '/admin/income' },
    { text: 'Expenses', icon: <TrendingDownIcon fontSize="small" />, path: '/admin/expenses' },
    { text: 'Financial', icon: <AccountBalanceWalletIcon fontSize="small" />, path: '/admin/financial' },
    { text: 'Settings', icon: <SettingsIcon fontSize="small" />, path: '/admin/settings' },
  ];

  const activeItem = menuItems.find(item => location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path)));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', width: '100vw', overflowX: 'hidden' }}>
      <CssBaseline />
      
      {/* Top Header */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${currentWidth}px)`,
          ml: `${currentWidth}px`,
          bgcolor: 'background.default',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          boxShadow: 'none',
          transition: 'width 0.2s',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.1rem' }}>
              {activeItem ? activeItem.text : 'Dashboard'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: 'text.secondary' }}>
              <NotificationsNoneIcon />
            </IconButton>
            <Box 
              sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
              onClick={handleMenuOpen}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.dark', fontSize: '0.9rem' }}>DD</Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>Debapriya Das</Typography>
              <Box sx={{ bgcolor: 'rgba(0, 229, 255, 0.1)', color: 'primary.main', px: 1, py: 0.25, borderRadius: 1, fontSize: '0.75rem', fontWeight: 700 }}>
                Admin
              </Box>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              sx={{ mt: 1 }}
            >
              <MenuItem onClick={handleLogout} sx={{ fontSize: '0.9rem', color: 'error.main', minWidth: 120 }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: currentWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: currentWidth,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            transition: 'width 0.2s',
            overflowX: 'hidden'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ minHeight: '64px !important', px: collapsed ? 2 : 3, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
          <MemoryIcon sx={{ color: 'primary.main' }} />
          {!collapsed && (
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', whiteSpace: 'nowrap' }}>
              Konica ERP
            </Typography>
          )}
        </Toolbar>
        
        <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2 }}>
          <List sx={{ px: 1 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <ListItem 
                  key={item.text} 
                  component={Link} 
                  to={item.path}
                  sx={{
                    mb: 0.5,
                    borderRadius: 1.5,
                    bgcolor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                    color: isActive ? 'text.primary' : 'text.secondary',
                    px: collapsed ? 2 : 2,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                      color: 'text.primary'
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'inherit', minWidth: collapsed ? 0 : 36, display: 'flex', justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 500 }}>{item.text}</Typography>} />
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
        
        {/* Collapse Button */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <ListItem 
            component="div" 
            onClick={() => setCollapsed(!collapsed)}
            sx={{ cursor: 'pointer', borderRadius: 1.5, color: 'text.secondary', px: collapsed ? 2 : 2, justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: collapsed ? 0 : 36, display: 'flex', justifyContent: 'center' }}>
              {collapsed ? <MenuIcon fontSize="small" /> : <KeyboardArrowLeftIcon fontSize="small" />}
            </ListItemIcon>
            {!collapsed && <ListItemText primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>Collapse</Typography>} />}
          </ListItem>
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, transition: 'width 0.2s', minWidth: 0, width: `calc(100vw - ${currentWidth}px)`, maxWidth: `calc(100vw - ${currentWidth}px)`, boxSizing: 'border-box' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
