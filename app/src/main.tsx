import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { store } from './store'
import { RouterProvider } from 'react-router'
import { routes } from './routes.ts'
import { i18n } from './i18n'
import { I18nextProvider } from 'react-i18next'

createRoot(document.getElementById('root')!).render(
  <><StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={routes}/>
      </I18nextProvider>
    </Provider>
  </StrictMode>
  </>
)
