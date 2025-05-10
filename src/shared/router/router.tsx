import { ErrorPage } from '@/pages/error-page'
import { RouteObject } from 'react-router-dom'
import { MAIN_PAGE, REMOTE, TEST_PAGE } from './routes'
import { TestPage } from '@/pages/test-page'
import { RemoteApp } from '@/pages/remote-app'

export const routes: RouteObject[] = [
    {
        path: MAIN_PAGE,
        element: <div className="bg-primary h-screen w-screen" />,
        errorElement: <ErrorPage />,
    },
    {
        path: TEST_PAGE,
        element: <TestPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: REMOTE,
        element: <RemoteApp />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/*',
        element: <ErrorPage />,
    },
]
