import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './components/not-found/not-found'
import { ThemeProvider } from './contexts/theme-context'
import './index.css'
import { HomeLayout } from './layouts/main-layout/main-layout'
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<HomeLayout />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
)
