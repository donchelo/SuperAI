import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { CustomThemeProvider } from './components/Context/ThemeContext';
import { EmployeeProvider } from './components/Pages/Empleados/components/EmployeeContext';
import { CommentProvider } from './components/Ayuda/CommentContext';

const SuperAILandingPage = React.lazy(() => import('./components/landingPage/SuperAILandingPage'));
const Header = React.lazy(() => import('./components/Header/Header'));
const Chat = React.lazy(() => import('./components/Chat/Chat'));
const Ayuda = React.lazy(() => import('./components/Ayuda/Ayuda'));
const Dashboards = React.lazy(() => import('./components/Dashboards/Dashboards'));
const TabSwitcher = React.lazy(() => import('./components/Memoria/TabSwitcher'));
const Pricing = React.lazy(() => import('./components/Pages/Pricing'));
const TerminosYCondiciones = React.lazy(() => import('./components/landingPage/TerminosYCondiciones'));
const PoliticaDePrivacidad = React.lazy(() => import('./components/landingPage/PoliticaDePrivacidad'));
const EmployeeManagement = React.lazy(() => import('./components/Pages/Empleados/components/EmployeeManagement'));
const Actualizaciones = React.lazy(() => import('./components/Header/Actualizaciones'));
const LoginPage = React.lazy(() => import('./components/Pages/LoginPage/LoginPage'));
const BugsAndComments = React.lazy(() => import('./components/Ayuda/BugsAndComments')); // Asegúrate de que la ruta sea correcta

const Loading: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const App: React.FC = () => {
  return (
    <Router basename="/">
      <CustomThemeProvider>
        <EmployeeProvider>
          <CommentProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<SuperAILandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/terms" element={<TerminosYCondiciones />} />
                <Route path="/politica-de-privacidad" element={<PoliticaDePrivacidad />} />
                <Route path="/actualizaciones" element={<Actualizaciones />} />
                <Route path="/app" element={<Header />}>
                  <Route path="chat" element={<Chat />} />
                  <Route path="memoria" element={<TabSwitcher />} />
                  <Route path="ayuda" element={<Ayuda />} />
                  <Route path="dashboards" element={<Dashboards />} />
                  <Route path="empleados" element={<EmployeeManagement />} />
                  <Route path="bugs-and-comments" element={<BugsAndComments />} /> {/* Nueva ruta */}
                </Route>
              </Routes>
            </Suspense>
          </CommentProvider>
        </EmployeeProvider>
      </CustomThemeProvider>
    </Router>
  );
};

export default App;
