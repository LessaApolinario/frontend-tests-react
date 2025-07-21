import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { HomePage } from '../pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
])

export { router }
