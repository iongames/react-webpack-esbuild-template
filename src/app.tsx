import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './shared/router/router'
import React from 'react'
import ReactDOM from 'react-dom'
import { init } from '@module-federation/enhanced/runtime'
import packageJson from '../package.json'
import './shared/styles/index.css'
import './i18n'

const reactVersion = packageJson.dependencies.react
const reactDOMVersion = packageJson.dependencies['react-dom']

// Should only be used in host app
init({
    name: 'host_app',
    remotes: [
        {
            name: 'remote_app',
            alias: 'remote_app',
            entry: 'http://localhost:3001/mf-manifest.json',
        },
    ],
    shared: {
        react: {
            version: '19.1.0',
            scope: 'default',
            lib: () => React,
            shareConfig: {
                singleton: true,
                requiredVersion: reactVersion,
            },
        },
        'react-dom': {
            version: '19.1.0',
            scope: 'default',
            lib: () => ReactDOM,
            shareConfig: {
                singleton: true,
                requiredVersion: reactDOMVersion,
            },
        },
    },
})

const router = createBrowserRouter(
    routes
    // { basename: 'remote' } enable for remote app
)

const App = () => <RouterProvider router={router} />

export default App
