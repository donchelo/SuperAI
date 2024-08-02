import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Button, useMediaQuery, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import Icon from '@mdi/react';
import { mdiChat, mdiMemory, mdiHelpCircle, mdiViewDashboard } from '@mdi/js';
import profilePicture from '../../assets/profile-picture.png';
import { useThemeContext } from '../../Theme/ThemeContext';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
const ProfilePicture = ({ onClick }) => {
    const [imageError, setImageError] = useState(false);
    return (React.createElement(Avatar, { alt: "Perfil", src: !imageError ? profilePicture : undefined, onError: () => setImageError(true), sx: { width: 40, height: 40, bgcolor: 'primary.main', cursor: 'pointer' }, onClick: onClick }, "U"));
};
const Header = () => {
    const theme = useTheme();
    const { toggleTheme, isDarkMode } = useThemeContext();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
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
    return (React.createElement(React.Fragment, null,
        React.createElement(AppBar, { position: "fixed", sx: {
                bgcolor: isDarkMode ? theme.palette.background.paper : theme.palette.background.default,
                color: isDarkMode ? theme.palette.text.primary : theme.palette.text.secondary,
            }, elevation: 1 },
            React.createElement(Toolbar, { sx: { justifyContent: 'space-between' } },
                isMobile ? (React.createElement(React.Fragment, null,
                    React.createElement(IconButton, { edge: "start", color: "inherit", "aria-label": "menu", onClick: handleMenuOpen, sx: { mr: 2 } },
                        React.createElement(MenuIcon, null)),
                    React.createElement(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose }, menuItems.map((item) => (React.createElement(MenuItem, { key: item.route, onClick: handleMenuClose, selected: location.pathname === item.route, component: Link, to: item.route },
                        React.createElement(Icon, { path: item.icon, size: 1 }),
                        React.createElement(Typography, { sx: { ml: 1 } }, item.label))))))) : null,
                React.createElement(Box, { sx: {
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        alignItems: 'center'
                    } },
                    React.createElement(Typography, { variant: isMobile ? 'h6' : 'h5', component: "h1", fontWeight: "bold", noWrap: true, sx: { flexGrow: isMobile ? 0 : 1 } }, "Super AI Empresarial")),
                !isMobile && (React.createElement(Box, { sx: { display: 'flex', gap: 1, flexGrow: 1, alignItems: 'center' } }, menuItems.map((item) => (React.createElement(Button, { key: item.route, component: Link, to: item.route, color: "inherit", sx: {
                        color: location.pathname === item.route ? theme.palette.primary.main : 'inherit',
                        '&:hover': { bgcolor: theme.palette.action.hover },
                    } },
                    React.createElement(Icon, { path: item.icon, size: 1 }),
                    React.createElement(Typography, { sx: { ml: 1 } }, item.label)))))),
                React.createElement(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 } },
                    React.createElement(IconButton, { onClick: toggleTheme, color: "inherit" }, isDarkMode ? React.createElement(Brightness7, null) : React.createElement(Brightness4, null)),
                    React.createElement(ProfilePicture, { onClick: handleProfileMenuOpen }),
                    React.createElement(Menu, { anchorEl: profileAnchorEl, open: Boolean(profileAnchorEl), onClose: handleProfileMenuClose },
                        React.createElement(MenuItem, { onClick: handleSignOut }, "Sign Out"))))),
        React.createElement(Toolbar, null),
        React.createElement(Box, { sx: { mt: 2, px: 2 } },
            React.createElement(Outlet, null))));
};
export default Header;
