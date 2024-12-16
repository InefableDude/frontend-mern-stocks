import React, { useState, useEffect } from 'react'
import { RiStockFill, RiPriceTag3Line } from 'react-icons/ri'
import axios from 'axios'
import Header from '../components/ui/Header.jsx'
import Stocks from '../components/home/Stocks.jsx'
import Watchlist from '../components/home/Watchlist.jsx'
import { RiBriefcase2Line, RiStockLine } from 'react-icons/ri'

const Home = () => {
	const [typeInfo, setTypeInfo] = useState(() => {
		return localStorage.getItem("type_info") || "stocks";
	});

	useEffect(() => {
		localStorage.setItem("type_info", typeInfo);
	}, [typeInfo]);

	return (
		<div>
			<Header></Header>
			<div className="flex gap-x-4 items-center justify-center m-4">
				<button className={`transition duration-500 ease-in-out text-xl flex gap-x-2 items-center border border-slate-300 rounded-xl px-4 py-2 hover:scale-110 shadow-md ${typeInfo === 'stocks' ? 'bg-black border-slate-100 text-white hover:bg-slate-800' : 'hover:bg-slate-100' }`} onClick={()=> setTypeInfo('stocks')} to="/"><RiStockFill className="text-green-500"></RiStockFill> Stocks</button>
				<button className={`transition duration-500 ease-in-out text-xl flex gap-x-2 items-center border border-slate-300 rounded-xl px-4 py-2 hover:scale-110 shadow-md ${typeInfo === 'watchlist' ? 'bg-black border-slate-100 text-white hover:bg-slate-800' : 'hover:bg-slate-100' }`} onClick={()=> setTypeInfo('watchlist')} to="/watchlist"><RiPriceTag3Line className="text-blue-600"></RiPriceTag3Line> Watchlist</button>
			</div>
			{
				typeInfo === "stocks" ?  <Stocks></Stocks> : <Watchlist></Watchlist>
			}
		</div>
	)
}

export default Home