
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { ThemeProvider } from '@/hooks/use-theme';
import MainLayout from '@/components/MainLayout';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </MainLayout>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
