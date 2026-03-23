import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Pages
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Membership = lazy(() => import('./pages/public/JoinUs'));
const Events = lazy(() => import('./pages/public/Events'));
const EventDetails = lazy(() => import('./pages/public/EventDetails'));
const Contact = lazy(() => import('./pages/public/Contact'));

// Admin Pages
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageEvents = lazy(() => import('./pages/admin/ManageEvents'));
const Registrations = lazy(() => import('./pages/admin/Registrations'));
const Messages = lazy(() => import('./pages/admin/Messages'));
const BannerManagement = lazy(() => import('./pages/admin/BannerManagement'));

// Layouts
const PublicLayout = lazy(() => import('./layouts/PublicLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="loading-screen">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Membership />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="join-us" element={<Membership />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:id" element={<EventDetails />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="registrations" element={<Registrations />} />
              <Route path="messages" element={<Messages />} />
              <Route path="banners" element={<BannerManagement />} />
            </Route>
          </Routes>
        </Suspense>
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </AuthProvider>
  );
}

export default App;
