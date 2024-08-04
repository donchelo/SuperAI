import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  styled,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import Icon from '@mdi/react';
import { mdiChat, mdiMemory, mdiHelpCircle, mdiViewDashboard, mdiRobotExcited } from '@mdi/js';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import ThemeToggle from './ThemeToggle';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'inherit',
  '&:hover': { backgroundColor: theme.palette.action.hover },
  transition: 'all 0.3s',
  justifyContent: 'flex-start',
  width: '100%',
  textAlign: 'left',
}));

const DrawerContent = styled(Box)({
  width: 250,
});

const NavIcon = styled(Icon)({
  marginRight: '16px',
  width: '24px', // Ancho fijo para alinear todos los iconos
});

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

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

  const menuItems = useMemo(() => [
    { icon: mdiChat, label: 'Chat', route: '/app/chat' },
    { icon: mdiMemory, label: 'Memoria', route: '/app/memoria' },
    { icon: mdiViewDashboard, label: 'Dashboards', route: '/app/dashboards' },
    { icon: mdiHelpCircle, label: 'Ayuda', route: '/app/ayuda' }
  ], []);

  const renderDrawerContent = () => (
    <DrawerContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.route}
            selected={location.pathname === item.route}
            onClick={() => handleNavigation(item.route)}
          >
            <ListItemIcon>
              <NavIcon path={item.icon} size={1} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ThemeToggle />
        </ListItem>
        <ListItem button onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </DrawerContent>
  );

  return (
    <>
      <StyledAppBar position="fixed" elevation={1}>
        <StyledToolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          <LogoContainer>
            <NavIcon path={mdiRobotExcited} size={1.5} color={theme.palette.primary.main} />
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              sx={{ ml: 1, fontFamily: "'Roboto Slab', serif" }}
            >
              Super AI Empresarial
            </Typography>
          </LogoContainer>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
              {menuItems.map((item) => (
                <NavButton
                  key={item.route}
                  component={Link}
                  to={item.route}
                  sx={{
                    color: location.pathname === item.route ? 'primary.main' : 'inherit',
                    width: 'auto', // Anular el ancho 100% para los botones de navegación en el header
                  }}
                >
                  <NavIcon path={item.icon} size={1} />
                  <Typography>{item.label}</Typography>
                </NavButton>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ProfilePicture onSignOut={handleSignOut} />
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      <Toolbar /> {/* Espaciador para empujar el contenido principal */}
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
      >
        {renderDrawerContent()}
      </Drawer>

      <Box sx={{ mt: 2, px: 2, pb: isMobile ? 7 : 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;