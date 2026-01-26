import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './components/not-found/not-found'
import './index.css'
import { HomeLayout } from './layouts/main-layout/main-layout'
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<HomeLayout />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
