import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './shared/styles/index.css'
import './i18n'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
