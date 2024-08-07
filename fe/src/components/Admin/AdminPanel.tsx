import React from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import BugsAndComments from './BugsAndComments';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/admin/bugs-and-comments');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Panel Administrativo
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="Admin Panel Tabs">
          <Tab label="Bugs and Comments" component={Link} to="/admin/bugs-and-comments" />
        </Tabs>
      </Paper>
      <Routes>
        <Route path="bugs-and-comments" element={<BugsAndComments />} />
      </Routes>
    </Box>
  );
};

export default AdminPanel;
