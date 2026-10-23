import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
}

interface DayPlanProps {
  date: string;
  activities: Activity[];
}

const DayPlan: React.FC<DayPlanProps> = ({ date, activities }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {date}
      </Typography>
      
      {activities.map((activity) => (
        <Box key={activity.id} sx={{ mb: 2, pl: 2, borderLeft: '3px solid green' }}>
          <Typography variant="subtitle1">
            {activity.time} - {activity.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activity.location}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {activity.description}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default DayPlan;