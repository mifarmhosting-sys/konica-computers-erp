import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from 'react-redux';
import { theme } from './theme';
import api from './services/api';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth';
import { fetchCurrentUser } from './store/slices/authSlice';
import type { AppDispatch } from './store';

// Layouts & Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCategories from './pages/admin/Categories';
import AdminBrands from './pages/admin/Brands';
import AdminProducts from './pages/admin/Products';
import Billing from './pages/admin/Billing';
import Purchase from './pages/admin/Purchase';
import Inventory from './pages/admin/Inventory';
import Customers from './pages/admin/Customers';
import Reports from './pages/admin/Reports';
import Sales from './pages/admin/Sales';
import Banking from './pages/admin/Banking';
import Income from './pages/admin/Income';
import Expenses from './pages/admin/Expenses';
import Financial from './pages/admin/Financial';
import Settings from './pages/admin/Settings';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 1. Establish CSRF handshake
    // 2. Fetch the user 
    api.get('/sanctum/csrf-cookie').finally(() => {
      dispatch(fetchCurrentUser());
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              
              {/* Master Data Routes */}
              <Route path="categories" element={<AdminCategories />} />
              <Route path="brands" element={<AdminBrands />} />
              <Route path="products" element={<AdminProducts />} />
              
              {/* Other ERP Module Routes */}
              <Route path="billing" element={<Billing />} />
              <Route path="purchase" element={<Purchase />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="customers" element={<Customers />} />
              <Route path="reports" element={<Reports />} />
              <Route path="sales" element={<Sales />} />
              <Route path="banking" element={<Banking />} />
              <Route path="income" element={<Income />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="financial" element={<Financial />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}