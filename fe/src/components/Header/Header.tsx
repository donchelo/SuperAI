import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Button, useMediaQuery, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import Icon from '@mdi/react';
import { mdiChat, mdiMemory, mdiHelpCircle, mdiViewDashboard } from '@mdi/js';
import profilePicture from '../../assets/profile-picture.png';
import { useThemeContext } from '../../Theme/ThemeContext';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const ProfilePicture: React.FC<{ onClick: (event: React.MouseEvent<HTMLElement>) => void }> = ({ onClick }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <Avatar
      alt="Perfil"
      src={!imageError ? profilePicture : undefined}
      onError={() => setImageError(true)}
      sx={{ width: 40, height: 40, bgcolor: 'primary.main', cursor: 'pointer' }}
      onClick={onClick}
    >
      U
    </Avatar>
  );
};

const Header: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleSignOut = () => {
    // Aquí puedes añadir lógica para cerrar sesión si es necesario
    handleProfileMenuClose();
    navigate('/');
  };

  const menuItems = [
    { icon: mdiChat, label: 'Chat', route: '/app/chat' },
    { icon: mdiMemory, label: 'Memoria', route: '/app/memoria' },
    { icon: mdiViewDashboard, label: 'Dashboards', route: '/app/dashboards' },
    { icon: mdiHelpCircle, label: 'Ayuda', route: '/app/ayuda' }
  ];

  return (
    <>
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
                    key={item.route} 
                    onClick={handleMenuClose}
                    selected={location.pathname === item.route}
                    component={Link}
                    to={item.route}
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
                  key={item.route}
                  component={Link}
                  to={item.route}
                  color="inherit"
                  sx={{
                    color: location.pathname === item.route ? theme.palette.primary.main : 'inherit',
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
            <ProfilePicture onClick={handleProfileMenuOpen} />
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={{ mt: 2, px: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;