import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Dialog, 
  DialogTitle, DialogContent, DialogActions, Grid, MenuItem, IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import api from '../../services/api';

interface Expense {
  id: number;
  expense_date: string;
  category: string;
  amount: number;
  description: string | null;
  payment_method: string;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    expense_date: new Date().toISOString().split('T')[0],
    category: '',
    amount: '',
    description: '',
    payment_method: ''
  });

  const categories = ['Rent', 'Utilities', 'Salary', 'Misc', 'Maintenance', 'Office Supplies'];
  const paymentMethods = ['Cash', 'Bank Transfer', 'UPI', 'Credit Card'];

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/api/expenses');
      setExpenses(res.data.data);
    } catch (err) {
      console.error('Failed to fetch expenses');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleOpenModal = (expense?: Expense) => {
    if (expense) {
      setEditingId(expense.id);
      setFormData({
        expense_date: expense.expense_date,
        category: expense.category,
        amount: expense.amount.toString(),
        description: expense.description || '',
        payment_method: expense.payment_method
      });
    } else {
      setEditingId(null);
      setFormData({
        expense_date: new Date().toISOString().split('T')[0],
        category: '',
        amount: '',
        description: '',
        payment_method: ''
      });
    }
    setOpenModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/expenses/${editingId}`, formData);
      } else {
        await api.post('/api/expenses', formData);
      }
      setOpenModal(false);
      fetchExpenses();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || 'Failed to save expense');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/api/expenses/${id}`);
        fetchExpenses();
      } catch (err) {
        alert('Failed to delete expense');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Expenses</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
          Log Expense
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'primary.contrastText' }}>Date</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Category</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Description</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Payment Method</TableCell>
              <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Amount</TableCell>
              <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.expense_date}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{expense.category}</TableCell>
                <TableCell>{expense.description || '-'}</TableCell>
                <TableCell>{expense.payment_method}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>₹{Number(expense.amount).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenModal(expense)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(expense.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>No expenses found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{editingId ? 'Edit Expense' : 'Log New Expense'}</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField 
                  fullWidth 
                  required 
                  type="date" 
                  label="Date" 
                  value={formData.expense_date} 
                  onChange={e => setFormData({ ...formData, expense_date: e.target.value })} 
                  slotProps={{ inputLabel: { shrink: true } }} 
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField 
                  select 
                  fullWidth 
                  required 
                  label="Category" 
                  value={formData.category} 
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField 
                  select 
                  fullWidth 
                  required 
                  label="Payment Method" 
                  value={formData.payment_method} 
                  onChange={e => setFormData({ ...formData, payment_method: e.target.value })}
                >
                  {paymentMethods.map(pm => <MenuItem key={pm} value={pm}>{pm}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField 
                  fullWidth 
                  required 
                  type="number" 
                  label="Amount" 
                  slotProps={{ htmlInput: { step: '0.01', min: 0 } }} 
                  value={formData.amount} 
                  onChange={e => setFormData({ ...formData, amount: e.target.value })} 
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField 
                  fullWidth 
                  multiline 
                  rows={2} 
                  label="Description (Optional)" 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Expense</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}