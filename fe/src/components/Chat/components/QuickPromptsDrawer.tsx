import React from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import QuickPrompts from './QuickPrompts';

interface QuickPromptsDrawerProps {
  open: boolean;
  isMobile: boolean;
  toggleQuickPrompts: () => void;
  onPromptClick: (text: string) => void;
}

const QuickPromptsDrawer: React.FC<QuickPromptsDrawerProps> = ({ open, isMobile, toggleQuickPrompts, onPromptClick }) => {
  return (
    <>
      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={open}
        onClose={toggleQuickPrompts}
      >
        <Box sx={{ p: 2, width: isMobile ? '100%' : 300, pt: isMobile ? 0 : '64px' }}>
          <IconButton
            color="primary"
            onClick={toggleQuickPrompts}
            sx={{ float: 'right' }}
          >
            <Close />
          </IconButton>
          <QuickPrompts onPromptClick={onPromptClick} />
        </Box>
      </Drawer>
    </>
  );
};

export default QuickPromptsDrawer;
