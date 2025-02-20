import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@radix-ui/themes/styles.css';
import './styles/index.css';
import './styles/tailwind.css';
import { Theme } from '@radix-ui/themes';
import App from './app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Theme>
  </StrictMode>,
);
