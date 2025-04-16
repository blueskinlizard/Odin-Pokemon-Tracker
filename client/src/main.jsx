/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './Pages/App.jsx'
import routes from './Router/routes.jsx'

const router = createBrowserRouter(routes);
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
