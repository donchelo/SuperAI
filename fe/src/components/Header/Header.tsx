import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Button, useMediaQuery, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import Icon from '@mdi/react';
import { mdiChat, mdiMemory, mdiHelpCircle, mdiViewDashboard } from '@mdi/js';
import profilePicture from '../../assets/profile-picture.jpg';
import { useThemeContext } from '../../Theme/ThemeContext';

const ProfilePicture: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  return (
    <Avatar
      alt="Perfil"
      src={!imageError ? profilePicture : undefined}
      onError={() => setImageError(true)}
      sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}
    >
      U
    </Avatar>
  );
};

interface HeaderProps {
  activePage: 'chat' | 'memoria' | 'ayuda' | 'dashboards';
  setActivePage: (page: 'chat' | 'memoria' | 'ayuda' | 'dashboards') => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (page: 'chat' | 'memoria' | 'ayuda' | 'dashboards') => {
    setActivePage(page);
    handleMenuClose();
  };

  const menuItems = [
    { icon: mdiChat, label: 'Chat', page: 'chat' },
    { icon: mdiMemory, label: 'Memoria', page: 'memoria' },
    { icon: mdiViewDashboard, label: 'Dashboards', page: 'dashboards' },
    { icon: mdiHelpCircle, label: 'Ayuda', page: 'ayuda' }
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: isDarkMode ? theme.palette.background.paper : theme.palette.background.default,
        color: isDarkMode ? theme.palette.text.primary : theme.palette.text.secondary,
      }} 
      elevation={1}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem 
                  key={item.page} 
                  onClick={() => handlePageChange(item.page as 'chat' | 'memoria' | 'ayuda' | 'dashboards')}
                  selected={activePage === item.page}
                >
                  <Icon path={item.icon} size={1} />
                  <Typography sx={{ ml: 1 }}>{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : null}

        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: isMobile ? 'center' : 'flex-start',
          alignItems: 'center'
        }}>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            component="h1" 
            fontWeight="bold" 
            noWrap
            sx={{ flexGrow: isMobile ? 0 : 1 }}
          >
            Super AI Empresarial
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.page}
                color="inherit"
                onClick={() => setActivePage(item.page as 'chat' | 'memoria' | 'ayuda' | 'dashboards')}
                sx={{
                  color: activePage === item.page ? theme.palette.primary.main : 'inherit',
                  '&:hover': { bgcolor: theme.palette.action.hover },
                }}
              >
                <Icon path={item.icon} size={1} />
                <Typography sx={{ ml: 1 }}>{item.label}</Typography>
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <ProfilePicture />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;