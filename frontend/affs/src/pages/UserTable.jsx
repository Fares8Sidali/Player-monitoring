import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Edit, Save, X, Search } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';

function UserTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editValues, setEditValues] = useState({});

    const { authUser, getoverview, users, isLoadingUser, updateUserStats } = useAuthStore();

    useEffect(() => {
        getoverview();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const filteredUsers = users.filter((user) =>
                user.Name.toLowerCase().includes(term)
            );
            setFiltered(filteredUsers);
        } else {
            setFiltered(users);
        }
    }, [searchTerm, users]);

    const handleEditClick = (user) => {
        setEditingUserId(user.Id);
        setEditValues({
            Goals: user.Goals,
            Assists: user.Assists,
            Apperance: user.Apperance,
            Contre: user.Contre,
            Avrg: user.Avrg,
        });
    };

    const handleInputChange = (field, value) => {
        setEditValues((prev) => ({
            ...prev,
            [field]: Number(value),
        }));
    };

    const handleSave = async (userId) => {
        await updateUserStats(userId, {
            goals: editValues.Goals,
            assists: editValues.Assists,
            apperance: editValues.Apperance,
            contre: editValues.Contre,
            avrg: editValues.Avrg,
        });
        setEditingUserId(null);
        setEditValues({});
    };

    const handleCancel = () => {
        setEditingUserId(null);
        setEditValues({});
    };

    if (isLoadingUser) return <p className="text-white">Loading...</p>;

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Players Lists</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search....'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Full Name
                            </th>
                            {["Goals", "Assists", "Apperance", "Contre", "Avrg"].map((label) => (
                                <th key={label} className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                    {label}
                                </th>
                            ))}
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-700'>
                        {(searchTerm ? filtered : users).map((user) => {
                            const isEditing = editingUserId === user.Id;

                            return (
                                <motion.tr
                                    key={user.Id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >

                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='flex-shrink-0 h-10 w-10'>
                                                <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                    {user.Name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className='ml-4'>
                                                <div className='text-sm font-medium text-gray-100'>{user.Name}</div>
                                            </div>
                                        </div>
                                    </td>


                                    {["Goals", "Assists", "Apperance", "Contre", "Avrg"].map((field) => (
                                        <td key={field} className='px-6 py-4 text-sm text-gray-300'>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={editValues[field]}
                                                    onChange={(e) =>
                                                        handleInputChange(field, e.target.value)
                                                    }
                                                    className='bg-gray-700 border border-gray-600 rounded px-2 py-1 w-16 text-white'
                                                />
                                            ) : (
                                                user[field]
                                            )}
                                        </td>
                                    ))}

                                    <td className='px-6 py-4 text-sm text-gray-300'>
                                        {authUser?.role === "admin" ? (
                                            isEditing ? (
                                                <>
                                                    <button
                                                        onClick={() => handleSave(user.Id)}
                                                        className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-white text-xs"
                                                    >
                                                        <Save size={14} />
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-xs"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="text-blue-400 hover:text-blue-600 text-xs align-middle"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                            )
                                        ) : (
                                            <span className="text-gray-500 text-xs italic">No access</span>
                                        )}

                                    </td>

                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default UserTable;