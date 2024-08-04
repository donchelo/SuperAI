import React, { useCallback, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Icon from '@mdi/react';
import { mdiChat, mdiMemory, mdiHelpCircle, mdiViewDashboard, mdiRobotExcited } from '@mdi/js';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { icon: mdiChat, label: 'Chat', route: '/app/chat' },
  { icon: mdiMemory, label: 'Memoria', route: '/app/memoria' },
  { icon: mdiViewDashboard, label: 'Dashboards', route: '/app/dashboards' },
  { icon: mdiHelpCircle, label: 'Ayuda', route: '/app/ayuda' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  const handleSignOut = useCallback(() => {
    navigate('..');
  }, [navigate]);

  const handleNavigation = useCallback((route: string) => {
    navigate(route);
    setDrawerOpen(false);
  }, [navigate]);

  const DrawerContent = useMemo(() => (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6">Menú</Typography>
        <IconButton onClick={toggleDrawer} edge="end" aria-label="cerrar menú">
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1, overflowY: 'auto', py: 0 }}>
        {menuItems.map(item => (
          <ListItemButton
            key={item.route}
            selected={location.pathname === item.route}
            onClick={() => handleNavigation(item.route)}
            sx={{
              py: 2,
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
            }}
          >
            <ListItemIcon>
              <Icon path={item.icon} size={1} color={location.pathname === item.route ? theme.palette.primary.main : theme.palette.text.primary} />
            </ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: location.pathname === item.route ? 'bold' : 'normal' }} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <ListItemButton onClick={handleSignOut} sx={{ py: 2 }}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <ThemeToggle />
        </Box>
      </Box>
    </Box>
  ), [location.pathname, handleNavigation, handleSignOut, theme, toggleDrawer]);

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Icon path={mdiRobotExcited} size={1} color={theme.palette.primary.main} />
            <Typography
              variant="h6"
              component="h1"
              sx={{ ml: 1, fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}
            >
              Super AI Empresarial
            </Typography>
          </Box>
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {menuItems.map(item => (
                <Button
                  key={item.route}
                  component={Link}
                  to={item.route}
                  color={location.pathname === item.route ? 'primary' : 'inherit'}
                  sx={{ 
                    mx: 0.5,
                    fontWeight: location.pathname === item.route ? 'bold' : 'normal',
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                  }}
                  startIcon={<Icon path={item.icon} size={1} />}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          <ProfilePicture onSignOut={handleSignOut} />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 280,
            boxShadow: theme.shadows[5],
          },
        }}
      >
        {DrawerContent}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default React.memo(Header);