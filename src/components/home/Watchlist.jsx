import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../ui/Spinner.jsx'
import GraficaStock from './GraficaStock.jsx'
import { RiBriefcase2Line } from 'react-icons/ri'
import { useSnackbar } from 'notistack'

const Watchlist = () => {
	const [loading, setLoading] = useState(false);
	const [stocks, setStocks] = useState([]);
	const [typeInfo, setTypeInfo] = useState(() => {
		return localStorage.getItem("type_info") || "stocks";
	});

	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await axios.get('http://localhost:5555/api/stocks');
				setStocks(res.data.data);
				enqueueSnackbar(`Watchlist actualizado correctamente`, { variant: "success" });

			} catch (error) {
				console.error(error);
				enqueueSnackbar(error.message, { variant: "error" });
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
				<h2 className="text-3xl text-center">Watchlist</h2>
				<ul className="w-full p-2">
					<li className="grid grid-cols-2 text-2xl text-center p-2 border-b border-slate-300">
						<p>Nombre</p>
						<p>Grafica</p>
					</li>
					{
						stocks.map(stock => {
							if (stock.watchlist === true) {
								return (
									<li className="cursor-pointer transition duration-500 ease-in-out flex hover:bg-slate-100 border-b border-slate-300 p-2 text-xl text-center items-center justify-center" key={stock.symbol}>
										<span className="w-max flex items-center gap-x-2"><RiBriefcase2Line></RiBriefcase2Line> {stock.company}</span>
										<GraficaStock stock={stock}></GraficaStock>
									</li>
								);
							} return null;
						})
					}
				</ul>
			</div>
		)
	)
}

export default Watchlist