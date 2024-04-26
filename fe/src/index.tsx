import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { App } from "./App";

import { Planets, loader as planetsLoader } from "./components/planets/Planets";
import {
  PlanetDetail,
  loader as planetDetailLoader,
} from "./components/planets/PlanetDetail";

import {
  Resources,
  loader as resourcesLoader,
} from "./components/resources/Resources";
import {
  ResourceDetail,
  loader as resourceDetailLoader,
} from "./components/resources/ResourceDetail";

import { Gases, loader as gasLoader } from "./components/gases/Gases";
import {
  GasDetail,
  loader as gasDetailLoader,
} from "./components/gases/GasDetail";
import { Home } from "./components/home/Home";

import { PlanetForm } from "./components/forms/PlanetForm";

import { DashboardHome } from "./components/forms/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "planets",
        loader: planetsLoader,
        element: <Planets />,
        children: [
          { index: true, element: <h2>Select a planet</h2> },
          {
            path: ":planetId",
            loader: planetDetailLoader,
            element: <PlanetDetail />,
          },
        ],
      },
      {
        path: "resources",
        loader: resourcesLoader,
        element: <Resources />,
        children: [
          { index: true, element: <h2>Select a resource</h2> },
          {
            path: ":resourceId",
            loader: resourceDetailLoader,
            element: <ResourceDetail />,
          },
        ],
      },
      {
        path: "gases",
        loader: gasLoader,
        element: <Gases />,
        children: [
          { index: true, element: <h2>Select a gas</h2> },
          {
            path: ":gasId",
            loader: gasDetailLoader,
            element: <GasDetail />,
          },
        ],
      },
      { path: "creators", element: <DashboardHome /> },
      { path: "creators/new-planet", element: <PlanetForm /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No root element found");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
