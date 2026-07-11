import { useState, useEffect, useMemo } from 'react';
import { 
  Box, Grid, Paper, Typography, TextField, Button, Card, CardContent, CardActionArea, 
  IconButton, Divider, MenuItem, Chip, InputAdornment, Snackbar, Alert
} from '@mui/material';
import { 
  Search as SearchIcon, Add as AddIcon, Remove as RemoveIcon, 
  Delete as DeleteIcon, ShoppingCartCheckout as CheckoutIcon 
} from '@mui/icons-material';
import api from '../../services/api';

interface Category { id: number; name: string; }
interface Product {
  id: number;
  name: string;
  selling_price: number;
  stock_quantity: number;
  category?: Category;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Billing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  // Cart & Checkout State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/api/products'),
        api.get('/api/categories')
      ]);
      setProducts(prodRes.data.data);
      setCategories(catRes.data.data);
    } catch (error) {
      console.error('Error fetching catalog:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? p.category?.id === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    if (product.stock_quantity === 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock_quantity) return prev; // block over-adding
        return prev.map(item => item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        if (newQty > 0 && newQty <= item.product.stock_quantity) {
          return { ...item, quantity: newQty };
        }
      }
      return item;
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Financial Calculations (UI only, backend enforces final math)
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.selling_price * item.quantity), 0);
  const taxableAmount = Math.max(0, cartSubtotal - (discountAmount || 0));
  const taxAmount = taxableAmount * 0.18;
  const grandTotal = taxableAmount + taxAmount;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    const payload = {
      customer_name: customerName,
      customer_phone: customerPhone,
      payment_method: paymentMethod,
      discount_amount: discountAmount,
      items: cart.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity
      }))
    };

    try {
      const res = await api.post('/api/invoices', payload);
      setSuccessMsg(`Sale Complete! Invoice generated: ${res.data.data.invoice_number}`);
      
      // Reset POS State
      setCart([]);
      setCustomerName('');
      setCustomerPhone('');
      setDiscountAmount(0);
      
      // Refresh inventory to reflect new stock counts
      fetchData();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || 'Checkout failed. Check stock levels.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)', gap: 3 }}>
      {/* LEFT: Product Catalog */}
      <Box sx={{ flex: 7, display: 'flex', flexDirection: 'column' }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField 
            fullWidth 
            placeholder="Scan Barcode or Search Products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{ 
              input: { 
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> 
              } 
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
            <Chip 
              label="All Categories" 
              color={selectedCategory === null ? 'primary' : 'default'} 
              onClick={() => setSelectedCategory(null)} 
            />
            {categories.map(cat => (
              <Chip 
                key={cat.id} 
                label={cat.name} 
                color={selectedCategory === cat.id ? 'primary' : 'default'} 
                onClick={() => setSelectedCategory(cat.id)} 
              />
            ))}
          </Box>
        </Paper>

        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Grid container spacing={2}>
            {filteredProducts.map(product => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <Card sx={{ opacity: product.stock_quantity === 0 ? 0.6 : 1, height: '100%' }}>
                  <CardActionArea 
                    disabled={product.stock_quantity === 0} 
                    onClick={() => addToCart(product)}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                  >
                    <CardContent sx={{ width: '100%' }}>
                      <Typography variant="h6" noWrap>{product.name}</Typography>
                      <Typography variant="h5" color="primary" sx={{ mt: 1, fontWeight: 'bold' }}>
                        ₹{Number(product.selling_price).toFixed(2)}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {product.category?.name}
                        </Typography>
                        <Chip 
                          size="small" 
                          color={product.stock_quantity > 0 ? "success" : "error"} 
                          label={product.stock_quantity > 0 ? `${product.stock_quantity} In Stock` : 'Out of Stock'} 
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* RIGHT: Active Register (Cart) */}
      <Paper sx={{ flex: 5, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <Typography variant="h6">Current Order</Typography>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {cart.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ mt: 5 }}>Cart is empty</Typography>
          ) : (
            cart.map(item => (
              <Box key={item.product.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.product.name}</Typography>
                  <Typography variant="body2" color="primary">₹{Number(item.product.selling_price).toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small" onClick={() => updateQuantity(item.product.id, -1)}><RemoveIcon fontSize="small"/></IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton size="small" onClick={() => updateQuantity(item.product.id, 1)}><AddIcon fontSize="small"/></IconButton>
                  <Typography sx={{ minWidth: 70, textAlign: 'right', fontWeight: 'bold' }}>
                    ₹{(item.product.selling_price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton color="error" size="small" onClick={() => removeFromCart(item.product.id)}>
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Divider />

        {/* Summary & Checkout */}
        <Box sx={{ p: 2, bgcolor: 'background.default' }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 6 }}>
              <TextField fullWidth size="small" label="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField fullWidth size="small" label="Phone" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography>₹{cartSubtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
            <Typography>Discount (₹)</Typography>
            <TextField 
              size="small" 
              type="number" 
              sx={{ width: 100 }}
              value={discountAmount || ''} 
              onChange={e => setDiscountAmount(Number(e.target.value))} 
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>GST (18%)</Typography>
            <Typography>₹{taxAmount.toFixed(2)}</Typography>
          </Box>

          <Divider sx={{ my: 1 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total</Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>₹{grandTotal.toFixed(2)}</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 4 }}>
              <TextField select fullWidth size="small" label="Payment" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="card">Card</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 8 }}>
              <Button 
                fullWidth 
                variant="contained" 
                color="success" 
                size="large" 
                startIcon={<CheckoutIcon />}
                onClick={handleCheckout}
                disabled={cart.length === 0 || loading}
                sx={{ height: '100%', fontWeight: 'bold' }}
              >
                {loading ? 'Processing...' : 'Complete Sale & Print'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

    {/* Success Notification */}
    <Snackbar open={!!successMsg} autoHideDuration={4000} onClose={() => setSuccessMsg('')}>
      <Alert severity="success" sx={{ width: '100%' }}>{successMsg}</Alert>
    </Snackbar>
  </Box>
  );
}