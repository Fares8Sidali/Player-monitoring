import { Menu, BarChart2, Users, UserCheck, TrendingUp, Settings, BookOpen, GitPullRequest, CalendarCheck, LogOutIcon ,MessageCircle} from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';

function Sidebar() {
    const { logout } = useAuthStore();
    const navigate = useNavigate(); 

    const SIDEBAR_ITEMS = [
        { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
        { name: "Announcement", icon: BookOpen, color: "#8B5CF6", href: "/Announcement" },
        { name: "Profile", icon: Users, color: "#EC4899", href: "/profile" },
        { name: "Setings", icon: Settings, color: "DC3C22", href: "/settings" },
    ];  

    const handleLogout = () => {
        logout();
        navigate("/login"); 
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
                >
                    <Menu size={24} />
                </motion.button>

                <nav className='mt-8 flex-grow'>
                    {SIDEBAR_ITEMS.map((item) => (
                        <Link key={item.href} to={item.href}>
                            <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            className='ml-4 whitespace-nowrap'
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                    <motion.div
                        onClick={handleLogout}
                        className='cursor-pointer flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'
                    >
                        <LogOutIcon size={20} style={{ color: "#6EE7B7", minWidth: "20px" }} />
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    className='ml-4 whitespace-nowrap'
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2, delay: 0.3 }}
                                >
                                    Deconnexion
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </nav>
            </div>
        </motion.div>
    );
}

export default Sidebar;
