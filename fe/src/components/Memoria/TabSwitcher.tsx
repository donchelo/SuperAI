import React, { useState } from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery, useScrollTrigger, Slide } from '@mui/material';
import ADN from './ADN/ADN';
import DatosInternos from './DatosInternos/DatosInternos';
import EmployeeManagement from '../Pages/Empleados/components/EmployeeManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const TabSwitcher: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <HideOnScroll>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          backgroundColor: theme.palette.background.default,
          zIndex: 1,
          width: '100%',
          pt: isMobile ? 6 : 8, // Ajustar el margen superior para acercar al header
        }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="memoria tabs" 
            variant="fullWidth" // Distribuir las pestañas equitativamente
            centered // Centrar las pestañas
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="ADN" />
            <Tab label="Datos Internos" />
            <Tab label="Empleados" />
          </Tabs>
        </Box>
      </HideOnScroll>
      <TabPanel value={value} index={0}>
        <ADN />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DatosInternos />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmployeeManagement />
      </TabPanel>
    </Box>
  );
};

export default TabSwitcher;
