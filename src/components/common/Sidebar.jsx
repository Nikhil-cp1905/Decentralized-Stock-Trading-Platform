import {
    BarChart2,
    DollarSign,
    Menu,
    Settings,
    ShoppingBag,
    ShoppingCart,
    TrendingUp,
    Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
    {
        name: "Overview",
        icon: BarChart2,
        color: "#22c55e",
        href: "/",
    },
	
    { name: "Products", icon: ShoppingBag, color: "#4ade80", href: "/products" },
    { name: "Users", icon: Users, color: "#86efac", href: "/users" },
    { name: "Sales", icon: DollarSign, color: "#16a34a", href: "/sales" },
    { name: "Orders", icon: ShoppingCart, color: "#4ade80", href: "/orders" },
    { name: "Analytics", icon: TrendingUp, color: "#22c55e", href: "/analytics" },
    { name: "Settings", icon: Settings, color: "#16a34a", href: "/settings" },
];

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <motion.div
            className={`relative z-10 h-screen flex-shrink-0 bg-black shadow-lg fixed right-0`} // Green and black theme, right-side bar
            animate={{ width: isSidebarOpen ? 260 : 80 }} // Dynamically control width
        >
            <div className="h-full flex flex-col justify-between p-4">
                {/* Toggle Button */}
                <motion.button
                    whileHover={{ rotate: 0 }} // Changed animation to rotation
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-3 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-600 transition"
                >
                    <Menu size={24} />
                </motion.button>

                {/* Navigation Items */}
                <nav className="mt-10 flex flex-col gap-2">
                    {SIDEBAR_ITEMS.map((item) => (
                        <Link key={item.href} to={item.href}>
                            <motion.div
                                className="flex items-center gap-4 text-sm font-semibold p-3 rounded-lg cursor-pointer text-green-300 hover:bg-green-800"
                                whileHover={{ scale: 1.05 }} // Subtle zoom animation
                                transition={{ duration: 0.3 }}
                            >
                                <item.icon
                                    size={24}
                                    style={{ color: item.color, minWidth: "24px" }}
                                />
                                {isSidebarOpen && (
                                    <motion.span
                                        className="whitespace-nowrap text-white"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </motion.div>
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="text-green-500 text-xs text-center mt-auto">
                    <p>&copy; 2025 Your Company</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
