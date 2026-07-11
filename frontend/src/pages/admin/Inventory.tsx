import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab, TextField, InputAdornment, Select, MenuItem, Badge } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';

const Inventory: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 1, borderRadius: 2 }}>
          <LayersIcon sx={{ color: 'primary.main', fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>Inventory Reports</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Read-only stock reporting and analytics. Add products via the Purchase module.</Typography>
        </Box>
      </Box>

      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', mb: 3 }}>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
          <Tab label="Stock Overview" />
          <Tab label="Stock Movements" />
          <Tab label={
            <Badge badgeContent={2} sx={{ 
              '& .MuiBadge-badge': { 
                bgcolor: '#f44336', 
                color: 'white', 
                fontWeight: 700,
                right: -15
              } 
            }}>
              <Box sx={{ pr: 2 }}>Low Stock Alerts</Box>
            </Badge>
          } />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box>
          {/* Total Stock Value Widget */}
          <Paper sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: '#0a101d', 
            border: '1px solid rgba(0, 229, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: 'rgba(0, 229, 255, 0.1)', p: 1, borderRadius: 2, display: 'flex' }}>
                <TrendingUpIcon sx={{ color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 0.5 }}>TOTAL STOCK VALUE</Typography>
                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>₹0</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>2 products - 2 shown</Typography>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search SKU, name, brand, category..."
              variant="outlined"
              size="small"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment>,
                  sx: { bgcolor: 'rgba(255,255,255,0.02)' }
                }
              }}
            />
            <Select size="small" defaultValue="all" sx={{ minWidth: 150, bgcolor: 'rgba(255,255,255,0.02)' }}>
              <MenuItem value="all">All Categories</MenuItem>
            </Select>
            <Select size="small" defaultValue="all" sx={{ minWidth: 150, bgcolor: 'rgba(255,255,255,0.02)' }}>
              <MenuItem value="all">All Brands</MenuItem>
            </Select>
          </Box>

          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ display: 'flex', minWidth: 1000, p: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'text.secondary' }}>
                <Typography variant="caption" sx={{ flex: 1.5, fontWeight: 600 }}>SKU</Typography>
                <Typography variant="caption" sx={{ flex: 3, fontWeight: 600 }}>PRODUCT NAME</Typography>
                <Typography variant="caption" sx={{ flex: 2, fontWeight: 600 }}>CATEGORY</Typography>
                <Typography variant="caption" sx={{ flex: 1.5, fontWeight: 600 }}>BRAND</Typography>
                <Typography variant="caption" sx={{ flex: 1.5, fontWeight: 600, textAlign: 'center' }}>QTY IN HAND</Typography>
                <Typography variant="caption" sx={{ flex: 2, fontWeight: 600, textAlign: 'right' }}>LAST PURCHASE COST</Typography>
                <Typography variant="caption" sx={{ flex: 1.5, fontWeight: 600, textAlign: 'right' }}>STOCK VALUE</Typography>
                <Typography variant="caption" sx={{ flex: 1.5, fontWeight: 600, textAlign: 'center' }}>STATUS</Typography>
              </Box>

              {/* Row 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 1000, p: 2, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <Typography variant="body2" sx={{ flex: 1.5, color: 'primary.main' }}>Lap-Hp-001</Typography>
                <Typography variant="body2" sx={{ flex: 3, fontWeight: 500 }}>Hp Pavilion</Typography>
                <Typography variant="body2" sx={{ flex: 2, color: 'text.secondary' }}>Laptop</Typography>
                <Typography variant="body2" sx={{ flex: 1.5, color: 'text.secondary' }}>HP</Typography>
                <Typography variant="body2" sx={{ flex: 1.5, textAlign: 'center', fontWeight: 600 }}>0</Typography>
                <Typography variant="body2" sx={{ flex: 2, textAlign: 'right' }}>₹50,000.00</Typography>
                <Typography variant="body2" sx={{ flex: 1.5, textAlign: 'right', color: 'primary.main', fontWeight: 600 }}>₹0</Typography>
                <Box sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#f44336', bgcolor: 'rgba(244, 67, 54, 0.1)', px: 1.5, py: 0.5, borderRadius: 1, fontWeight: 600 }}>Out of Stock</Typography>
                </Box>
              </Box>

              {/* Row 2 */}
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 1000, p: 2 }}>
                <Typography variant="body2" sx={{ flex: 1.5, color: 'primary.main' }}>LAP-HP-001</Typography>
                <Typography variant="body2" sx={{ flex: 3, fontWeight: 500 }}>KEYBOARD LAPTOP (90 DAYS WARRANTY)</Typography>
                <Typography variant="body2" sx={{ flex: 2, color: 'text.secondary' }}>LAPTOP KBD</Typography>
                <Typography variant="body2" sx={{ flex: 1.5, color: 'text.secondary' }}>HP</Typography>
                <Typography variant="body2" sx={{ flex: 1.5, textAlign: 'center', fontWeight: 600 }}>1</Typography>
                <Typography variant="body2" sx={{ flex: 2, textAlign: 'right' }}>₹900.00</Typography>
                <Typography variant="body2" sx={{ flex: 1.5, textAlign: 'right', color: 'primary.main', fontWeight: 600 }}>₹900</Typography>
                <Box sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#ff9800', bgcolor: 'rgba(255, 152, 0, 0.1)', px: 1.5, py: 0.5, borderRadius: 1, fontWeight: 600 }}>Low Stock</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Inventory;
