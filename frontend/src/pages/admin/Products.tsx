import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Grid
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import api from '../../services/api';

interface Category { id: number; name: string; }
interface Brand { id: number; name: string; }
interface Product {
  id: number;
  sku: string;
  name: string;
  cost_price: number;
  selling_price: number;
  stock_quantity: number;
  alert_quantity: number;
  category?: Category;
  brand?: Brand;
}

// Indian Rupee Currency Formatter
const formatINR = (amount: number | string) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(Number(amount));
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  
  // Modal State
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', sku: '', category_id: '', brand_id: '',
    cost_price: '', selling_price: '', stock_quantity: '0', alert_quantity: '5', description: ''
  });

  const fetchData = async () => {
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        api.get('/api/products'),
        api.get('/api/categories'),
        api.get('/api/brands')
      ]);
      setProducts(prodRes.data.data);
      setCategories(catRes.data.data);
      setBrands(brandRes.data.data);
    } catch (error) {
      console.error('Error fetching master data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fixed Event Typing for MUI Inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/products', formData);
      setProducts([response.data.data, ...products]);
      setOpen(false);
      // Reset form
      setFormData({
        name: '', sku: '', category_id: '', brand_id: '',
        cost_price: '', selling_price: '', stock_quantity: '0', alert_quantity: '5', description: ''
      });
    } catch (err) {
      // Fixed unknown error type casting
      const error = err as { response?: { data?: { message?: string } } };
      console.error('Error adding product:', error);
      alert(error.response?.data?.message || 'Failed to add product. Check validation rules.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Products</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <TableCell>SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Selling</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell sx={{ fontFamily: 'monospace', color: '#90caf9' }}>{product.sku}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{product.name}</TableCell>
                <TableCell>
                  <Chip label={product.category?.name || 'N/A'} size="small" color="primary" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip label={product.brand?.name || 'N/A'} size="small" color="secondary" variant="outlined" />
                </TableCell>
                <TableCell align="right" sx={{ opacity: 0.8 }}>{formatINR(product.cost_price)}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#66bb6a' }}>{formatINR(product.selling_price)}</TableCell>
                <TableCell align="right">
  <Typography 
    color={product.stock_quantity <= product.alert_quantity ? 'error' : 'inherit'} 
    sx={{ fontWeight: product.stock_quantity <= product.alert_quantity ? 'bold' : 'normal' }}
  >
    {product.stock_quantity}
  </Typography>
</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>No products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Product Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleAdd}>
          <DialogTitle sx={{ fontWeight: 'bold' }}>Add New Hardware Product</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField 
                  select 
                  fullWidth 
                  required 
                  label="Category" 
                  name="category_id" 
                  value={formData.category_id} 
                  onChange={(e) => handleInputChange(e as any)}
                >
                  {categories.map((c) => (<MenuItem key={c.id} value={String(c.id)}>{c.name}</MenuItem>))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField 
                  select 
                  fullWidth 
                  required 
                  label="Brand" 
                  name="brand_id" 
                  value={formData.brand_id} 
                  onChange={(e) => handleInputChange(e as any)}
                >
                  {brands.map((b) => (<MenuItem key={b.id} value={String(b.id)}>{b.name}</MenuItem>))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField fullWidth required label="Product Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Dell XPS 15 OLED" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth required label="SKU" name="sku" value={formData.sku} onChange={handleInputChange} placeholder="SKU-DELL-009" />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField fullWidth required type="number" slotProps={{ htmlInput: { step: '0.01' } }} label="Cost Price (₹)" name="cost_price" value={formData.cost_price} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
               <TextField fullWidth required type="number" slotProps={{ htmlInput: { step: '0.01' } }} label="Selling Price (₹)" name="selling_price" value={formData.selling_price} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField fullWidth required type="number" label="Initial Stock" name="stock_quantity" value={formData.stock_quantity} onChange={handleInputChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField fullWidth required type="number" label="Alert Qty" name="alert_quantity" value={formData.alert_quantity} onChange={handleInputChange} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}