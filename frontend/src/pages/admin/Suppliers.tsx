import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import api from '../../services/api';

interface Supplier {
  id: number;
  name: string;
  contact_person: string;
  phone: string;
  email: string | null;
  address: string | null;
  gst_number: string | null;
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '', contact_person: '', phone: '', email: '', address: '', gst_number: ''
  });

  const fetchSuppliers = async () => {
    try {
      const res = await api.get('/api/suppliers');
      setSuppliers(res.data.data);
    } catch (err) {
      console.error('Failed to fetch suppliers');
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleOpenModal = (supplier?: Supplier) => {
    if (supplier) {
      setEditingId(supplier.id);
      setFormData({
        name: supplier.name, 
        contact_person: supplier.contact_person, 
        phone: supplier.phone,
        email: supplier.email || '',
        address: supplier.address || '',
        gst_number: supplier.gst_number || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', contact_person: '', phone: '', email: '', address: '', gst_number: '' });
    }
    setOpenModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/suppliers/${editingId}`, formData);
      } else {
        await api.post('/api/suppliers', formData);
      }
      setOpenModal(false);
      fetchSuppliers();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || 'Failed to save supplier');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await api.delete(`/api/suppliers/${id}`);
        fetchSuppliers();
      } catch (err) {
        alert('Cannot delete supplier. They may be linked to existing purchase orders.');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Suppliers</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
          Add Supplier
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'primary.contrastText' }}>Company Name</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Contact Person</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Phone</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>GST No.</TableCell>
              <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell sx={{ fontWeight: 'bold' }}>{supplier.name}</TableCell>
                <TableCell>{supplier.contact_person}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.gst_number || 'N/A'}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenModal(supplier)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(supplier.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{editingId ? 'Edit Supplier' : 'Add New Supplier'}</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth required label="Company Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth required label="Contact Person" value={formData.contact_person} onChange={e => setFormData({ ...formData, contact_person: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth required label="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth type="email" label="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="GST Number" value={formData.gst_number} onChange={e => setFormData({ ...formData, gst_number: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth multiline rows={2} label="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Supplier</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}