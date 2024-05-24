import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  RouterProvider,
} from "react-router-dom";
import ErrorBoundary from './ErrorBoundary.jsx';
import {routerConfigs} from './routerConfigs.js';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading..</div>}>
      <ErrorBoundary>
        <RouterProvider router={routerConfigs} />
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>
);

