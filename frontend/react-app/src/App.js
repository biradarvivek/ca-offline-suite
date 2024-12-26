import React from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <Dashboard />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
