import * as React from "react";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import {DashboardPage} from "./Pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />,
    },
]);

export function App() {
    return (
        <RouterProvider router={router} />
    )
}
