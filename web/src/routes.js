import * as React from "react";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import {DashboardPage} from "./Pages/Dashboard";
import { HomePage } from "./Pages/Home";
import { StudentsPage } from "./Pages/Students";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/alunos",
        element: <StudentsPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
    },
]);

export function App() {
    return (
        <RouterProvider router={router} />
    )
}
