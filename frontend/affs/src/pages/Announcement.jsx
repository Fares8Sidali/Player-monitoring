import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAnnouncementStore } from "../store/announcementStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

function Announcement() {
  const { authUser } = useAuthStore();
  const { announcements, fetchAnnouncements, sendAnnouncement, markAsSeen } = useAnnouncementStore();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authUser) {
      fetchAnnouncements(authUser._id);
      markAsSeen(authUser._id);
    }
  }, [authUser]);

  const handleSend = async () => {
    if (!title || !message) return;
    await sendAnnouncement({ title, message, userId: authUser._id });
    setTitle("");
    setMessage("");
    fetchAnnouncements(authUser._id);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 overflow-auto relative">
        <Header title="Annonces" />
        <div className="p-6 space-y-6">


          <div className="bg-gray-800 p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Create annonce</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows="4"
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer"
            >
              Send
            </button>
          </div>


          <div className="space-y-4">
            {announcements.length === 0 ? (
              <p className="text-gray-400">Empty.</p>
            ) : (
              announcements.map((a, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition duration-300">
                  <h3 className="text-xl font-bold text-blue-400 mb-1">{a.title}</h3>
                  <p className="text-gray-200 mb-2">{a.message}</p>
                  <div className="text-sm text-gray-400">
                    Par <span className="font-medium">{a.createdBy?.fullname || "Utilisateur"}</span> —{" "}
                    {new Date(a.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Announcement;
