import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Dialog, 
  DialogTitle, DialogContent, DialogActions, Grid, MenuItem, Chip, IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import api from '../../services/api';

interface Supplier { id: number; name: string; }
interface Product { id: number; name: string; cost_price: number; }
interface POItem { product_id: number; quantity: number; unit_cost: number; }
interface PurchaseOrder {
  id: number;
  order_date: string;
  status: string;
  total_amount: number;
  supplier: Supplier;
}

export default function Purchases() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  
  const [supplierId, setSupplierId] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<POItem[]>([]);

  const fetchData = async () => {
    try {
      const [ordRes, supRes, prodRes] = await Promise.all([
        api.get('/api/purchase-orders'),
        api.get('/api/suppliers'),
        api.get('/api/products')
      ]);
      setOrders(ordRes.data.data);
      setSuppliers(supRes.data.data);
      setProducts(prodRes.data.data);
    } catch (err) {
      console.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = () => {
    setItems([...items, { product_id: 0, quantity: 1, unit_cost: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItem = (index: number, field: keyof POItem, value: number) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    // Auto-fill unit_cost if product changes
    if (field === 'product_id') {
      const product = products.find(p => p.id === value);
      if (product) newItems[index].unit_cost = product.cost_price;
    }
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || items.some(i => i.product_id === 0)) {
      alert("Please add valid products to the order.");
      return;
    }

    try {
      await api.post('/api/purchase-orders', {
        supplier_id: supplierId,
        order_date: orderDate,
        items: items
      });
      setOpenModal(false);
      setSupplierId('');
      setItems([]);
      fetchData();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || 'Failed to create PO');
    }
  };

  const handleMarkReceived = async (id: number) => {
    if (window.confirm('Mark this PO as received? This will instantly increase inventory stock!')) {
      try {
        await api.put(`/api/purchase-orders/${id}`, { status: 'received' });
        fetchData();
      } catch (err) {
        alert('Failed to update status');
      }
    }
  };

  const grandTotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Purchase Orders</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
          Create PO
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'primary.contrastText' }}>PO ID</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Date</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Supplier</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Status</TableCell>
              <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Total Amount</TableCell>
              <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell sx={{ fontWeight: 'bold' }}>#{order.id}</TableCell>
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{order.supplier?.name}</TableCell>
                <TableCell>
                  <Chip 
                    size="small" 
                    label={order.status.toUpperCase()} 
                    color={order.status === 'received' ? 'success' : order.status === 'pending' ? 'warning' : 'error'} 
                  />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>₹{Number(order.total_amount).toFixed(2)}</TableCell>
                <TableCell align="right">
                  {order.status === 'pending' && (
                    <Button size="small" variant="outlined" color="success" onClick={() => handleMarkReceived(order.id)}>
                      Mark Received
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create New Purchase Order</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth required label="Supplier" value={supplierId} onChange={e => setSupplierId(e.target.value)}>
                  {suppliers.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth required type="date" label="Order Date" value={orderDate} onChange={e => setOrderDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mb: 2 }}>Order Items</Typography>
            {items.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <TextField select sx={{ flex: 2 }} required label="Product" value={item.product_id || ''} onChange={e => updateItem(index, 'product_id', Number(e.target.value))}>
                  {products.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                </TextField>
                <TextField sx={{ flex: 1 }} required type="number" label="Qty" slotProps={{ htmlInput: { min: 1 } }} value={item.quantity} onChange={e => updateItem(index, 'quantity', Number(e.target.value))} />
                <TextField sx={{ flex: 1 }} required type="number" label="Unit Cost" slotProps={{ htmlInput: { step: '0.01', min: 0 } }} value={item.unit_cost} onChange={e => updateItem(index, 'unit_cost', Number(e.target.value))} />
                <Typography sx={{ flex: 1, fontWeight: 'bold' }}>₹{(item.quantity * item.unit_cost).toFixed(2)}</Typography>
                <IconButton color="error" onClick={() => removeItem(index)}><DeleteIcon /></IconButton>
              </Box>
            ))}
            
            <Button variant="outlined" startIcon={<AddIcon />} onClick={addItem} sx={{ mb: 2 }}>
              Add Product to Order
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Grand Total: ₹{grandTotal.toFixed(2)}</Typography>
            </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={items.length === 0}>Submit Order</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}