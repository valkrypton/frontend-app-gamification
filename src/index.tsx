import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import Header from '@edx/frontend-component-header';
import { FooterSlot } from '@edx/frontend-component-footer';
import messages from './i18n';
import DashboardPage from './dashboard/DashboardPage';

import './index.scss';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);

// AppProvider already wraps its children in a react-router BrowserRouter
// (with a basename derived from PUBLIC_PATH) -- do not add another one here.
// Nesting a second <BrowserRouter> throws "You cannot render a <Router>
// inside another <Router>" at runtime.
subscribe(APP_READY, () => {
  root.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/course/:courseId" element={<DashboardPage />} />
        </Routes>
        <FooterSlot />
      </QueryClientProvider>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error: { message: any }) => {
  root.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
});
