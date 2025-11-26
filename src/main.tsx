import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/welcome' element={<h2>Welcome</h2>} />
      <Route path='*' element={<h2>Not Found</h2>} />
    </Routes>
  </BrowserRouter>
)
