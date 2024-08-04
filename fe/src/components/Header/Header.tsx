import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Button, useMediaQuery, useTheme, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import Icon from '@mdi/react';
import { mdiChat, mdiMemory, mdiHelpCircle, mdiViewDashboard } from '@mdi/js';
import profilePicture from '../../assets/profile-picture.png';
import { useThemeContext } from '../Context/ThemeContext';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

// Componente ProfilePicture con memo para optimizar el rendimiento
const ProfilePicture: React.FC<{ onClick: (event: React.MouseEvent<HTMLElement>) => void }> = React.memo(({ onClick }) => {
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
});

const Header: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const profileAnchorEl = useRef<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Cerrar el Drawer cuando cambia la ruta
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Manejadores de eventos envueltos en useCallback
  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const handleProfileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    profileAnchorEl.current = event.currentTarget;
  }, []);

  const handleProfileMenuClose = useCallback(() => {
    profileAnchorEl.current = null;
  }, []);

  const handleSignOut = useCallback(() => {
    handleProfileMenuClose();
    navigate('/');
  }, [handleProfileMenuClose, navigate]);

  const handleMenuItemClick = useCallback((route: string) => {
    navigate(route);
    handleDrawerClose();
  }, [navigate, handleDrawerClose]);

  // Memoizar el array de items del menú
  const menuItems = useMemo(() => [
    { icon: mdiChat, label: 'Chat', route: '/app/chat' },
    { icon: mdiMemory, label: 'Memoria', route: '/app/memoria' },
    { icon: mdiViewDashboard, label: 'Dashboards', route: '/app/dashboards' },
    { icon: mdiHelpCircle, label: 'Ayuda', route: '/app/ayuda' }
  ], []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: isDarkMode ? theme.palette.background.default : theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        elevation={1}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={handleDrawerClose}
                  onKeyDown={handleDrawerClose}
                >
                  <List>
                    {menuItems.map((item) => (
                      <ListItem
                        button
                        key={item.route}
                        selected={location.pathname === item.route}
                        onClick={() => handleMenuItemClick(item.route)}
                      >
                        <ListItemIcon>
                          <Icon path={item.icon} size={1} />
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}

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
              anchorEl={profileAnchorEl.current}
              open={Boolean(profileAnchorEl.current)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Espaciador para empujar el contenido principal */}
      <Box sx={{ mt: 2, px: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;
