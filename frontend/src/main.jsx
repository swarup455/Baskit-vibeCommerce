import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeSwitcher'
import { store } from './reduxToolkit/store/store'
import { Provider } from "react-redux"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          <Layout />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)