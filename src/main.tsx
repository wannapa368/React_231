import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TodoApp from '../components/todolist.tsx'
import GPAApp from '../components/GPA.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<App />*/}
    {/*<TodoApp />*/}
    <GPAApp />
  </StrictMode>,
)
