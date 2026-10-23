import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface TransportationOption {
  id: string;
  name: string;
  carbonPerKm: number;
  time: string;
  cost: string;
}

const TripPlanner: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [transportOptions, setTransportOptions] = useState<TransportationOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSearch = async () => {
    // Mock data for demonstration
    const mockOptions: TransportationOption[] = [
      {
        id: '1',
        name: 'Train',
        carbonPerKm: 0.035,
        time: '2h 30m',
        cost: '$45'
      },
      {
        id: '2',
        name: 'Electric Car',
        carbonPerKm: 0.055,
        time: '2h',
        cost: '$35 (estimated)'
      },
      {
        id: '3',
        name: 'Bus',
        carbonPerKm: 0.065,
        time: '3h',
        cost: '$25'
      },
      {
        id: '4',
        name: 'Standard Car',
        carbonPerKm: 0.12,
        time: '2h',
        cost: '$30 (estimated)'
      },
    ];
    
    setTransportOptions(mockOptions);
  };

  const calculateTotalCarbon = (distanceKm: number, carbonPerKm: number) => {
    return (distanceKm * carbonPerKm).toFixed(2);
  };

  // Mock distance
  const mockDistanceKm = 150;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Plan Your Eco-Friendly Trip
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="From"
            fullWidth
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="City or address"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="To"
            fullWidth
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="City or address"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
      </Grid>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearch}
        sx={{ mt: 2 }}
        disabled={!origin || !destination || !date}
      >
        Find Eco-Friendly Options
      </Button>
      
      {transportOptions.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Recommended Transportation Options
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Transportation</InputLabel>
                <Select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value as string)}
                  label="Select Transportation"
                >
                  {transportOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name} - {option.time} - {option.cost}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {selectedOption && (
                <Box sx={{ mt: 2 }}>
                  <Typography>
                    Estimated carbon emissions: {calculateTotalCarbon(
                      mockDistanceKm, 
                      transportOptions.find(o => o.id === selectedOption)?.carbonPerKm || 0
                    )} kg CO₂
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    (Based on {mockDistanceKm} km distance)
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default TripPlanner;