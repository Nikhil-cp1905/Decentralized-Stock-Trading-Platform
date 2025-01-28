import { useState, useEffect } from "react";
import {
	ComposedChart,
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { motion } from "framer-motion";

// Function to format time in HH:mm format
const formatTime = (date) => {
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
};

// Initial data for the chart (OHLC data from 00:00 onwards with 30-minute increments)
const generateInitialData = () => {
	const data = [];
	const start = new Date(0, 0, 0, 0, 0); // Start time 00:00
	for (let i = 0; i < 12; i++) {
		const open = Math.floor(Math.random() * 2000) + 1000; // Random Open value between 1000 and 3000
		const close = Math.floor(Math.random() * 2000) + 1000; // Random Close value
		const high = Math.max(open, close) + Math.floor(Math.random() * 500); // High value (larger than open/close)
		const low = Math.min(open, close) - Math.floor(Math.random() * 500); // Low value (smaller than open/close)

		data.push({
			time: formatTime(new Date(start.getTime() + i * 30 * 60 * 1000)),
			open: open,
			close: close,
			high: high,
			low: low,
		});
	}
	return data;
};

const CandlestickChart = () => {
	const [chartData, setChartData] = useState(generateInitialData());

	useEffect(() => {
		// Update data every 2 seconds, keep shifting left
		const interval = setInterval(() => {
			setChartData((prevData) => {
				const newData = prevData.slice(1); // Remove the first data point (shift left)
				const currentTime = new Date();
				const open = Math.floor(Math.random() * 2000) + 1000;
				const close = Math.floor(Math.random() * 2000) + 1000;
				const high = Math.max(open, close) + Math.floor(Math.random() * 500);
				const low = Math.min(open, close) - Math.floor(Math.random() * 500);
				const newSalesData = {
					time: formatTime(new Date(currentTime.getTime() + 30 * 60 * 1000)),
					open: open,
					close: close,
					high: high,
					low: low,
				};
				return [...newData, newSalesData]; // Add the new data at the end
			});
		}, 2000); // Update every 2 seconds

		return () => clearInterval(interval); // Clear interval on cleanup
	}, []);

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-100">Sales Overview</h2>

			<div className="h-80">
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="time" stroke="#9ca3af" />
						<YAxis stroke="#9ca3af" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						{/* Candlestick Bars */}
						<Bar
							dataKey="high"
							barSize={4}
							fill="#10B981" // Green for High bars
							isAnimationActive={true}
							animationDuration={1000}
							animationEasing="ease-in-out"
							unit={"USD"}
						/>
						<Bar
							dataKey="low"
							barSize={4}
							fill="#8B5CF6" // Purple for Low bars
							isAnimationActive={true}
							animationDuration={1000}
							animationEasing="ease-in-out"
							unit={"USD"}
						/>
						{/* Representing Close-Open as the bar itself*/}
						<Line
							type="monotone"
							dataKey="open"
							stroke="#6366F1" // Blue line for Open
							strokeWidth={2}
							isAnimationActive={true}
							animationDuration={1000}
							animationEasing="ease-in-out"
						/>
						<Line
							type="monotone"
							dataKey="close"
							stroke="#EF4444" // Red line for Close
							strokeWidth={2}
							isAnimationActive={true}
							animationDuration={1000}
							animationEasing="ease-in-out"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default CandlestickChart;
