import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, IconButton 
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import api from '../../services/api';

interface Brand {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBrands = async () => {
    try {
      const response = await api.get('/api/brands');
      setBrands(response.data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    try {
      const response = await api.post('/api/brands', { name });
      setBrands([response.data.data, ...brands]);
      setName('');
    } catch (error: any) {
      console.error('Error adding brand:', error);
      alert(error.response?.data?.message || 'Failed to add brand. It might already exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;
    
    try {
      await api.delete(`/api/brands/${id}`);
      setBrands(brands.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting brand:', error);
      alert('Failed to delete brand.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Brands</Typography>

      <Paper sx={{ p: 2, mb: 4 }} component="form" onSubmit={handleAdd}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField 
            label="New Brand Name" 
            variant="outlined" 
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ flexGrow: 1, maxWidth: 400 }}
            autoComplete="off"
          />
          <Button 
            type="submit"
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            disabled={loading || !name.trim()}
          >
            Add Brand
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id} hover>
                <TableCell>{brand.id}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{brand.name}</TableCell>
                <TableCell>{brand.slug}</TableCell>
                <TableCell>
                  <Chip 
                    label={brand.is_active ? 'Active' : 'Inactive'} 
                    color={brand.is_active ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDelete(brand.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {brands.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No brands found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}