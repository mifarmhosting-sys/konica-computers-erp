import { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Grid, TextField, MenuItem, Tabs, Tab
} from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';


export default function Purchases() {
  const [activeTab, setActiveTab] = useState(0);

  // Keep the state for products, categories, etc. just in case
  // const [products, setProducts] = useState<any[]>([]);
  const [orders] = useState<any[]>([]);

  useEffect(() => {
    // Dummy fetch or real fetch
    // api.get('/api/purchase-orders').then(res => setOrders(res.data.data)).catch(() => {});
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 1600, mx: 'auto', p: { xs: 2, md: 3 } }}>
      
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
        <Box sx={{ p: 1.5, bgcolor: 'rgba(0, 229, 255, 0.1)', borderRadius: 2, display: 'flex' }}>
          <LocalMallOutlinedIcon sx={{ color: '#00e5ff', fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}>
            Purchase Management
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Record purchases from vendors, manage categories & brands, and track payments.
          </Typography>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_e, v) => setActiveTab(v)}
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#00e5ff' },
            '& .MuiTab-root': { 
              color: 'text.secondary', 
              textTransform: 'none', 
              fontWeight: 600, 
              fontSize: '0.95rem',
              minHeight: 48,
              gap: 1
            },
            '& .Mui-selected': { color: '#00e5ff !important' },
          }}
        >
          <Tab icon={<LocalOfferOutlinedIcon fontSize="small" />} iconPosition="start" label="Purchase Entry" />
          <Tab icon={<AccountBalanceWalletOutlinedIcon fontSize="small" />} iconPosition="start" label="Vendor Payments" />
          <Tab icon={<CategoryOutlinedIcon fontSize="small" />} iconPosition="start" label="Categories & Brands" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box>
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              sx={{ 
                bgcolor: '#00e5ff', 
                color: 'black', 
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                '&:hover': { bgcolor: '#00b2cc' }
              }}
            >
              (+) New Purchase Entry
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<UploadFileIcon />} 
              sx={{ 
                color: '#00e5ff', 
                borderColor: 'rgba(0, 229, 255, 0.5)',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': { borderColor: '#00e5ff', bgcolor: 'rgba(0, 229, 255, 0.05)' }
              }}
            >
              Bulk Upload (.xlsx)
            </Button>
          </Box>

          {/* Purchase History Table */}
          <Box sx={{ 
            bgcolor: '#0a0a0a', 
            borderRadius: 3, 
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
            mb: 4
          }}>
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, color: 'white', px: 1 }}>Purchase History</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  size="small" 
                  variant="outlined" 
                  startIcon={<DescriptionIcon />} 
                  sx={{ color: '#4caf50', borderColor: 'rgba(76, 175, 80, 0.5)', textTransform: 'none', '&:hover': { borderColor: '#4caf50' } }}
                >
                  Excel
                </Button>
                <Button 
                  size="small" 
                  variant="outlined" 
                  startIcon={<PictureAsPdfIcon />} 
                  sx={{ color: '#f44336', borderColor: 'rgba(244, 67, 54, 0.5)', textTransform: 'none', '&:hover': { borderColor: '#f44336' } }}
                >
                  PDF
                </Button>
              </Box>
            </Box>
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                    {['Date', 'Vendor Name', 'Address', 'GST', 'Phone', 'Email', 'State Name', 'State Code', 'Amount', 'Tax', 'Total'].map((head) => (
                      <TableCell key={head} sx={{ color: 'text.secondary', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)', py: 1.5, fontSize: '0.75rem' }}>
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} align="center" sx={{ py: 6, color: 'text.secondary', borderBottom: 'none' }}>
                        No purchases recorded yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order, i) => (
                      <TableRow key={i}>
                        <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{order.date}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{order.vendor}</TableCell>
                        <TableCell colSpan={9} sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>...</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Product Entry Form Block */}
          <Box sx={{ 
            bgcolor: '#0a0a0a', 
            borderRadius: 3, 
            border: '1px solid rgba(255,255,255,0.05)',
            p: 3,
            mb: 4
          }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, mb: 2, display: 'block' }}>PRODUCT #1</Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Product Name *</Typography>
                <TextField 
                  fullWidth 
                  placeholder="e.g., HP Pavilion 15 Laptop i5 12th Gen" 
                  variant="outlined" 
                  size="small" 
                  sx={textFieldStyles}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Category *</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField select fullWidth value="" variant="outlined" size="small" sx={textFieldStyles}>
                    <MenuItem value="">Select category</MenuItem>
                  </TextField>
                  <Button variant="outlined" sx={{ minWidth: 40, p: 0, borderColor: 'rgba(255,255,255,0.1)' }}><AddIcon fontSize="small" /></Button>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Brand *</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField select fullWidth value="" variant="outlined" size="small" sx={textFieldStyles}>
                    <MenuItem value="">Select brand</MenuItem>
                  </TextField>
                  <Button variant="outlined" sx={{ minWidth: 40, p: 0, borderColor: 'rgba(255,255,255,0.1)' }}><AddIcon fontSize="small" /></Button>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>SKU (auto-generated)</Typography>
                <TextField fullWidth placeholder="Select category & brand" variant="outlined" size="small" disabled sx={textFieldStyles} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>HSN / SAC Code</Typography>
                <TextField fullWidth placeholder="e.g. 8471" variant="outlined" size="small" sx={textFieldStyles} />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Qty *</Typography>
                <TextField fullWidth type="number" defaultValue={1} variant="outlined" size="small" sx={textFieldStyles} />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Unit Cost (₹) *</Typography>
                <TextField fullWidth type="number" placeholder="0.00" variant="outlined" size="small" sx={textFieldStyles} />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block' }}>Tax %</Typography>
                <TextField select fullWidth value="18" variant="outlined" size="small" sx={textFieldStyles}>
                  <MenuItem value="18">18% (default)</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              startIcon={<AddIcon />} 
              sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 600, '&:hover': { color: 'white', bgcolor: 'transparent' } }}
            >
              Add Another Product
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#00e5ff', 
                color: 'black', 
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                '&:hover': { bgcolor: '#00b2cc' }
              }}
            >
              Save Products & Record Stock
            </Button>
          </Box>

        </Box>
      )}

    </Box>
  );
}

const textFieldStyles = {
  '& .MuiOutlinedInput-root': { 
    bgcolor: 'rgba(255,255,255,0.02)',
    color: 'white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&.Mui-focused fieldset': { borderColor: '#00e5ff' }
  },
  '& .Mui-disabled': {
    color: 'rgba(255,255,255,0.3) !important',
    WebkitTextFillColor: 'rgba(255,255,255,0.3) !important'
  }
};