import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';

const AppHelmetProvider = HelmetProvider as React.ElementType;

hydrateRoot(
    document.getElementById('root')!,
    <AppHelmetProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AppHelmetProvider>
);
