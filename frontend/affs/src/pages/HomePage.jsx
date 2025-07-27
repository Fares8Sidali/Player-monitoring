import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import UserTable from './UserTable';
import Header from './Header';
import { motion } from 'framer-motion';
import { useAnnouncementStore } from "../store/announcementStore.js";
import { useAuthStore } from "../store/useAuthStore.js"
import { Link } from "react-router-dom";

function HomePage() {
     const { authUser } = useAuthStore();
     const { fetchAnnouncements,unseenCount} = useAnnouncementStore();
       useEffect(() => {
    if (authUser) {
      fetchAnnouncements(authUser._id);
    }
  }, [authUser]);
    return (
        <>
            <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
                    <div className="absolute inset-0 backdrop-blur-sm " />
                </div>
                <Sidebar />
                <div className='flex-1 overflow-auto relative z-10'>
                    <Header title='Overview' />
                    <header className="flex justify-between items-center px-4 py-2 shadow">
                        <h1>🏆 Club</h1>
                        <Link to="/announcement" className="relative">
                            📢 Annonces
                            {unseenCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
                                    {unseenCount}
                                </span>
                            )}
                        </Link>
                    </header>
                    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                        <motion.div
                            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                        </motion.div>
                        <UserTable />
                    </main>
                </div>
            </div>
        </>
    )
}

export default HomePage