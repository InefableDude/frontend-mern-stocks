import React from 'react'
import { RiStockLine  } from "react-icons/ri";

const Header = () => {
	return (
		<div className="border-b-2 border-slate-200 p-4 w-full flex flex-start items-center gap-x-4 shadow-lg">
			<RiStockLine className="text-6xl text-green-600"></RiStockLine>
			<h1 className="text-4xl">Stocks Market MERN App</h1>
		</div>
	)
}

export default Header