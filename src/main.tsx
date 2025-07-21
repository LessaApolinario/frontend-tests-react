import { createRoot } from 'react-dom/client'
import { App } from './ui/frontend/app/App.tsx'
import './ui/frontend/styles/index.css'

createRoot(document.getElementById('root')!).render(<App />)
