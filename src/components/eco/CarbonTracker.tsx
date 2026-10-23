import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, Paper, Button } from '@mui/material';

interface CarbonData {
  totalEmissions: number;
  transportationEmissions: number;
  accommodationEmissions: number;
  offsetPercentage: number;
}

const CarbonTracker: React.FC<{ tripId: string }> = ({ tripId }) => {
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null);
  const [isOffsetting, setIsOffsetting] = useState(false);

  useEffect(() => {
    // Mock data for demonstration
    const mockData: CarbonData = {
      totalEmissions: 245.6,
      transportationEmissions: 198.4,
      accommodationEmissions: 47.2,
      offsetPercentage: 15
    };
    setCarbonData(mockData);
  }, [tripId]);

  const handleOffset = async () => {
    setIsOffsetting(true);
    setTimeout(() => {
      if (carbonData) {
        setCarbonData({
          ...carbonData,
          offsetPercentage: 100
        });
      }
      setIsOffsetting(false);
    }, 1500);
  };

  if (!carbonData) return <Typography>Loading carbon data...</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Trip's Carbon Footprint
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          Total Emissions: {carbonData.totalEmissions} kg CO₂
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ width: '150px' }}>
            Transportation:
          </Typography>
          <Typography variant="body2">
            {carbonData.transportationEmissions} kg CO₂
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ width: '150px' }}>
            Accommodation:
          </Typography>
          <Typography variant="body2">
            {carbonData.accommodationEmissions} kg CO₂
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          Carbon Offset Progress
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={carbonData.offsetPercentage} 
          sx={{ height: 10, borderRadius: 5, mb: 1 }}
        />
        <Typography variant="body2">
          {carbonData.offsetPercentage}% offset
        </Typography>
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleOffset}
        disabled={carbonData.offsetPercentage >= 100 || isOffsetting}
      >
        {isOffsetting ? 'Processing...' : 'Offset Your Carbon Footprint'}
      </Button>
      
      {carbonData.offsetPercentage >= 100 && (
        <Typography color="success.main" sx={{ mt: 1 }}>
          Thank you for offsetting 100% of your trip's carbon emissions!
        </Typography>
      )}
    </Paper>
  );
};

export default CarbonTracker;