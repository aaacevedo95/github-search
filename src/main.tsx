import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NuqsAdapter } from 'nuqs/adapters/react';

import i18n, { DEFAULT_LANG } from './i18n/index.ts';
import App from './App.tsx';

import './index.css';

i18n.changeLanguage(DEFAULT_LANG);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  </StrictMode>
);
