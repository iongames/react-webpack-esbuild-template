import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './shared/router/router'

const router = createBrowserRouter(
    routes
    // { basename: 'remote' } enable for remote app
)

export const App = () => <RouterProvider router={router} />
