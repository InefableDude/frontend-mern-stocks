import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

const GraficaStock = ({ stock }) => {
	const data = [
		{
			name: "Precio inicial",
			precio: stock.initial_price,
		},
		{
			name: "Precio 2002",
			precio: stock.price_2002,
		},
		{
			name: "Precio 2007",
			precio: stock.price_2007,
		},
	];

	return (
		<ResponsiveContainer width={"100%"} height={350}>
			<LineChart data={data} margin={{ top:20, bottom: 20, left: 20, right: 20,  }}>
				<CartesianGrid strokeDasharray="3 3"></CartesianGrid>
				<XAxis dataKey="name" padding={{ left: 30, right: 50 }}></XAxis>
				<YAxis></YAxis>
				<Tooltip></Tooltip>
				<Line type="monotone" dataKey="precio" stroke="#7CDB00" activeDot={{ r: 8 }}>
					<LabelList position="top" offset={10}></LabelList>
				</Line>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default GraficaStock