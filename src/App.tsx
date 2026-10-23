import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import TripPlanner from './components/trip/TripPlanner';
import GroupChat from './components/group/GroupChat';
import CarbonTracker from './components/eco/CarbonTracker';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green for sustainability theme
    },
    secondary: {
      main: '#0288d1', // Blue for travel theme
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="plan" element={<TripPlanner />} />
            <Route path="group/:groupId" element={<GroupChat groupId="123" userId="currentUser" />} />
            <Route path="carbon/:tripId" element={<CarbonTracker tripId="456" />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;