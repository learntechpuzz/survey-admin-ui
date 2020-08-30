import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import { PrivateRoute } from 'src/components/PrivateRoute';
import { Role } from './role';

const routes = [
  {
    path: 'app',
    element: <PrivateRoute roles={[Role.Admin, Role.Report, Role.User]} component={DashboardLayout} />,
    children: [
      { path: 'dashboard', element: <PrivateRoute roles={[Role.Admin, Role.Report, Role.User]} component={DashboardView} /> },
      { path: 'surveys', element: <PrivateRoute roles={[Role.Admin, Role.User]} component={ProductListView} /> },
      { path: 'reports', element: <PrivateRoute roles={[Role.Admin]} component={CustomerListView} /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
