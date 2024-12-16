import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../ui/Spinner.jsx'
import { useSnackbar } from 'notistack'
import { RiBriefcase2Line, RiStockLine } from 'react-icons/ri'
import { TbZoomMoney  } from 'react-icons/tb'
import StocksModal from './StocksModal.jsx'

const Stocks = () => {
	const [typeInfo, setTypeInfo] = useState(() => {
		return localStorage.getItem("type_info") || "stocks";
	});
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [stocks, setStocks] = useState([]);

	const { enqueueSnackbar } = useSnackbar();

	const getRandomColor = () => {
		const colors = ["#FF0000", "#4ade80"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	}

	const handleWatchlist = async stock => {
		!stock.watchlist ? addToWatchlist(stock) : remomeWatchlist(stock);
	}

	const remomeWatchlist = async stock => {
		try {
			setLoading(true);

			const updatedStock = {
				...stock,
				watchlist: false,
			}

			const res = await axios.put(`http://localhost:5555/api/stocks/${stock._id}`, updatedStock);

			setStocks(prevStocks => prevStocks.map(item => item._id === stock._id ? updatedStock : item));

			enqueueSnackbar(`${stock.company} removido de la watchlist`, { variant: "success" })
		} catch (error) {
			console.error(error);
			enqueueSnackbar(error.message, { variant: "error" });
		} finally {
			setLoading(false);
		}

	}

	const addToWatchlist = async stock => {
		try {
			setLoading(true);

			const updatedStock = {
				...stock,
				watchlist: true,
			}

			const res = await axios.put(`http://localhost:5555/api/stocks/${stock._id}`, updatedStock);

			setStocks(prevStocks => prevStocks.map(item => item._id === stock._id ? updatedStock : item));

			enqueueSnackbar(`${stock.company} agregado a la watchlist`, { variant: "success" })
		} catch (error) {
			console.error(error);
			enqueueSnackbar(error.message, { variant: "error" });
		} finally {
			setLoading(false);
		}

	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await axios.get('http://localhost:5555/api/stocks');
				setStocks(res.data.data);
				enqueueSnackbar(`Stocks actualizados correctamente`, { variant: "success" });
			} catch(error) {
				console.error(error);
				enqueueSnackbar(error.message, { variant: "error" })
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [typeInfo])

	return (
		loading ? (<Spinner></Spinner>) : 
		(
			<div className="m-4 w-3/4 mx-auto">
				<h2 className="text-3xl text-center">Stocks</h2>
				<ul className="w-full p-2">
					<li className="grid grid-cols-4 text-2xl text-center p-2 border-b border-slate-300">
						<p>Nombre</p>
						<p>Simbolo</p>
						<p>Precio Inicial</p>
						<p>Acciones</p>
					</li>
					{
						stocks.map(stock => (
							<li className="cursor-pointer transition duration-500 ease-in-out grid grid-cols-4 hover:bg-slate-100 border-b border-slate-300 p-2 text-xl text-center items-center justify-center" key={stock._id}>
								<span className="w-full flex items-center gap-x-2"><RiBriefcase2Line></RiBriefcase2Line> {stock.company}</span>
								<span>{stock.symbol}</span>
								<span style={{ color: getRandomColor() }}>${stock.initial_price}</span> 
								<StocksModal stock={stock} handleWatchlist={handleWatchlist}></StocksModal>
							</li>
						))
					}
				</ul>
			</div>
		)	
	)
}

export default Stocks