import React, { useState, useCallback, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Header from './components/Header/Header';
import { ThemeProvider } from './Theme/ThemeContext';

// Importaciones lazy para mejorar el rendimiento
const Chat = React.lazy(() => import('./components/Chat/Chat'));
const Ayuda = React.lazy(() => import('./components/Ayuda/Ayuda'));
const DashboardVentas = React.lazy(() => import('./components/Dashboards/DashboardVentas'));
const TabSwitcher = React.lazy(() => import('./components/TabSwitcher'));

type ActivePage = 'chat' | 'memoria' | 'ayuda' | 'dashboards';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('chat');

  const renderContent = useCallback(() => {
    switch (activePage) {
      case 'chat':
        return <Chat />;
      case 'memoria':
        return <TabSwitcher />;
      case 'ayuda':
        return <Ayuda />;
      case 'dashboards':
        return <DashboardVentas />;
      default:
        return null;
    }
  }, [activePage]);

  return (
    <ThemeProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header activePage={activePage} setActivePage={setActivePage} />
        <Box sx={{ flexGrow: 1, overflow: 'auto', padding: 2 }}>
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          }>
            {renderContent()}
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;