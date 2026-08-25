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
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@edx/frontend-component-header';
import { FooterSlot } from '@edx/frontend-component-footer';
import messages from './i18n';
import DashboardPage from './dashboard/DashboardPage';

import './index.scss';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);

subscribe(APP_READY, () => {
  root.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/course/:courseId" element={<DashboardPage />} />
          </Routes>
          <FooterSlot />
        </BrowserRouter>
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
