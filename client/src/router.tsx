import { createBrowserRouter, Navigate } from 'react-router-dom';
import comps from './components';
import views from './views';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <comps.DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
        ]

    },
    {
        path: '/',
        element: <comps.GuestLayout />,
        children: [
            {
                path: '/login',
                element: <views.Login />
            },
            {
                path: '/signup',
                element: <views.Signup />
            },
        ]
    },
    {
        path: '*',
        element: <views.NotFound />
    },
])
