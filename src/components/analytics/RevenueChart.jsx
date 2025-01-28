import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

// Generate random data
const generateRandomData = () => {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
	return months.map((month) => ({
		month,
		revenue: Math.floor(Math.random() * 5000) + 3000, // Random value between 3000 and 8000
		target: Math.floor(Math.random() * 5000) + 3000, // Random value between 3000 and 8000
	}));
};

const RevenueChart = () => {
	const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");
	const [revenueData, setRevenueData] = useState(generateRandomData());

	// Update data dynamically every 3 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setRevenueData(generateRandomData());
		}, 3000);

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []);

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Revenue vs Target</h2>
				<select
					className="bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={selectedTimeRange}
					onChange={(e) => setSelectedTimeRange(e.target.value)}
				>
					<option>This Week</option>
					<option>This Month</option>
					<option>This Quarter</option>
					<option>This Year</option>
				</select>
			</div>

			<div style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer>
					<AreaChart data={revenueData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
						<XAxis dataKey="month" stroke="#9CA3AF" />
						<YAxis stroke="#9CA3AF" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Area
							type="monotone"
							dataKey="revenue"
							stroke="#8B5CF6"
							fill="#8B5CF6"
							fillOpacity={0.3}
						/>
						<Area
							type="monotone"
							dataKey="target"
							stroke="#10B981"
							fill="#10B981"
							fillOpacity={0.3}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default RevenueChart;
