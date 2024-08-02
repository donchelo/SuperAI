import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from './Theme/ThemeContext';
// Importaciones lazy para mejorar el rendimiento
const SuperAILandingPage = React.lazy(() => import('./components/landingPage/SuperAILandingPage'));
const Header = React.lazy(() => import('./components/Header/Header'));
const Chat = React.lazy(() => import('./components/Chat/Chat'));
const Ayuda = React.lazy(() => import('./components/Ayuda/Ayuda'));
const Dashboards = React.lazy(() => import('./components/Dashboards/Dashboards'));
const TabSwitcher = React.lazy(() => import('./components/TabSwitcher'));
const Pricing = React.lazy(() => import('./components/landingPage/pricing'));
const TerminosYCondiciones = React.lazy(() => import('./components/landingPage/TerminosYCondiciones'));
const PoliticaDePrivacidad = React.lazy(() => import('./components/landingPage/PoliticaDePrivacidad'));
const App = () => {
    return (React.createElement(Router, { basename: "/SuperAI" },
        React.createElement(ThemeProvider, null,
            React.createElement(Suspense, { fallback: React.createElement(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } },
                    React.createElement(CircularProgress, null)) },
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(SuperAILandingPage, null) }),
                    React.createElement(Route, { path: "/pricing", element: React.createElement(Pricing, null) }),
                    React.createElement(Route, { path: "/terms", element: React.createElement(TerminosYCondiciones, null) }),
                    React.createElement(Route, { path: "/politica-de-privacidad", element: React.createElement(PoliticaDePrivacidad, null) }),
                    React.createElement(Route, { path: "/app", element: React.createElement(Header, null) },
                        React.createElement(Route, { path: "chat", element: React.createElement(Chat, null) }),
                        React.createElement(Route, { path: "memoria", element: React.createElement(TabSwitcher, null) }),
                        React.createElement(Route, { path: "ayuda", element: React.createElement(Ayuda, null) }),
                        React.createElement(Route, { path: "dashboards", element: React.createElement(Dashboards, null) })))))));
};
export default App;
