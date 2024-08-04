import React from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../Context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDarkMode } = useThemeContext();

  return (
    <MenuItem onClick={toggleTheme}>
      <ListItemIcon>
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </ListItemIcon>
      <ListItemText primary={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
    </MenuItem>
  );
};

export default ThemeToggle;
