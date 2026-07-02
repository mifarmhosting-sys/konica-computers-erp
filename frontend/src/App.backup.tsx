import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import api from './services/api';
import MainLayout from './layouts/MainLayout';
import Auth from './pages/Auth';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
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

function App() {
  // --- DROP THIS TEMPORARY TEST IN ---
  useEffect(() => {
    api.get('/sanctum/csrf-cookie')
      .then(() => {
        console.log("🟢 PHASE 1 PASSED: Sanctum Handshake Successful!");
      })
      .catch((err) => {
        console.error("🔴 PHASE 1 FAILED: Handshake rejected.", err);
      });
  }, []);
  // ------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Auth />} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes - Protected by Redux Authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
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
              {/* Keeping legacy routes intact but not linked in sidebar to preserve functionality if accessed */}
              <Route path="categories" element={<AdminCategories />} />
              <Route path="brands" element={<AdminBrands />} />
              <Route path="products" element={<AdminProducts />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
