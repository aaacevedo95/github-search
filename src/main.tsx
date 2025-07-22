import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NuqsAdapter } from 'nuqs/adapters/react';

import App from './App.tsx';

import './style/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  </StrictMode>
);
