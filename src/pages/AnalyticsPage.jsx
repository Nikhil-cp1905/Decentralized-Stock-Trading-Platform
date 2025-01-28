import Header from "../components/common/Header";

import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";

const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-black'>
			<Header title={"Analytics Dashboard"} className="text-green-500" />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards className="bg-green-900 text-white" />
				<RevenueChart className="bg-green-800 text-white" />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance className="bg-green-700 text-white" />
					<ProductPerformance className="bg-green-700 text-white" />
					<UserRetention className="bg-green-700 text-white" />
					<CustomerSegmentation className="bg-green-700 text-white" />
				</div>

				<AIPoweredInsights className="bg-green-600 text-white" />
			</main>
		</div>
	);
};

export default AnalyticsPage;
