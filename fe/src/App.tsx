import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { CustomThemeProvider } from './components/Context/ThemeContext';

const SuperAILandingPage = React.lazy(() => import('./components/landingPage/SuperAILandingPage'));
const Header = React.lazy(() => import('./components/Header/Header'));
const Chat = React.lazy(() => import('./components/Chat/Chat'));
const Ayuda = React.lazy(() => import('./components/Ayuda/Ayuda'));
const Dashboards = React.lazy(() => import('./components/Dashboards/Dashboards'));
const TabSwitcher = React.lazy(() => import('./components/Memoria/TabSwitcher'));
const Pricing = React.lazy(() => import('./components/landingPage/Pricing'));
const TerminosYCondiciones = React.lazy(() => import('./components/landingPage/TerminosYCondiciones'));
const PoliticaDePrivacidad = React.lazy(() => import('./components/landingPage/PoliticaDePrivacidad'));

const App: React.FC = () => {
  return (
    <Router basename="/">
      <CustomThemeProvider>
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        }>
          <Routes>
            <Route path="/" element={<SuperAILandingPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/terms" element={<TerminosYCondiciones />} />
            <Route path="/politica-de-privacidad" element={<PoliticaDePrivacidad />} />
            <Route path="/app" element={<Header />}>
              <Route path="chat" element={<Chat />} />
              <Route path="memoria" element={<TabSwitcher />} />
              <Route path="ayuda" element={<Ayuda />} />
              <Route path="dashboards" element={<Dashboards />} />
            </Route>
          </Routes>
        </Suspense>
      </CustomThemeProvider>
    </Router>
  );
};

export default App;
