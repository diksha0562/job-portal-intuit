import App from './App.tsx';
import React from 'react';
import {
    createBrowserRouter
  } from "react-router-dom";
const LazyFreelancerConatiner = React.lazy(() => import("./components/Freelancer/container.tsx"));
const LazyEmployerJonPosting = React.lazy(() => import("./components/Employer/container.tsx"));
const LazyNotFoundPage = React.lazy(() => import("./components/NotFoundPage/index.tsx"))

export const routerConfigs = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "freelancer",
      element: <LazyFreelancerConatiner />,
    },
    {
      path: "employer",
      element: <LazyEmployerJonPosting />,
    },
    {
      path: "*",
      element: <LazyNotFoundPage />,
    },
  ]);