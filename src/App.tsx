import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import UserManagement from './components/UserManagement';
import InstitutionManagement from './components/InstitutionManagement';
import ContentManagement from './components/ContentManagement';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/users" replace />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="institutions" element={<InstitutionManagement />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default App;