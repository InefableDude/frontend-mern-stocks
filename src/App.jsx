import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home></Home>}></Route>
		</Routes>
	)
}

export default App