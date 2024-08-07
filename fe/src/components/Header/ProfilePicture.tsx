import React, { useState, useCallback } from 'react';
import { Avatar, Menu, MenuItem, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import profilePicture from '../../assets/profile-picture.png';
import ThemeToggle from './ThemeToggle';

interface ProfilePictureProps {
  onSignOut: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = React.memo(({ onSignOut }) => {
  const [imageError, setImageError] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSignOut = useCallback(() => {
    onSignOut();
    handleMenuClose();
  }, [onSignOut, handleMenuClose]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <>
      <Avatar
        alt="Perfil"
        src={!imageError ? profilePicture : undefined}
        onError={handleImageError}
        sx={{ 
          width: 40, 
          height: 40, 
          bgcolor: 'primary.main', 
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
        onClick={handleMenuOpen}
      >
        {imageError && 'U'}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ThemeToggle />
        </MenuItem>
        <MenuItem component={Link} to="/admin" onClick={handleMenuClose}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AdminPanelSettingsIcon sx={{ mr: 1 }} />
            <Typography>Admin Panel</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ExitToAppIcon sx={{ mr: 1 }} />
            <Typography>Cerrar Sesión</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
});

ProfilePicture.displayName = 'ProfilePicture';

export default ProfilePicture;
