import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', title: 'Login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.default) },
  { path: 'home', title: 'Home', loadComponent: () => import('./pages/home/home.component').then(m => m.default) },
  { path: 'services', title: 'Servicios', loadComponent: () => import('./pages/products/products.component').then(m => m.default) },
  { path: 'cart', title: 'Cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.default) },
  { path: 'payment', title: 'Payment', loadComponent: () => import('./components/payment/payment.component').then(m => m.default) },
  { path: 'admin', title: 'Home', loadComponent: () => import('./admin/admin-home/admin-home.component').then(m => m.default) },
  { path: 'employee', title: 'Home', loadComponent: () => import('./employee/employee.home/employee.home.component').then(m => m.default) },
  { path: 'dashboard', title: 'Dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.default) },
  { path: 'usermanage', title: 'User Management', loadComponent: () => import('./admin/user-manage/user-manage.component').then(m => m.default) },
  { path: 'servicemanage', title: 'Service Management', loadComponent: () => import('./admin/manage-services/manage-services.component').then(m => m.default) },
  { path: 'servicerequests', title: 'Service Request', loadComponent: () => import('./admin/service-requests/service-requests.component').then(m => m.default) },
  { path: 'support', title: 'Support', loadComponent: () => import('./components/support/support.component').then(m => m.default) }

];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
