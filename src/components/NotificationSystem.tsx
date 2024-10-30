import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulating notifications (replace with actual logic later)
    const timer = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now(),
        message: 'Remember to log your expenses for today!',
        type: 'info',
      };
      setNotifications((prev) => [...prev, newNotification]);
    }, 60000); // Every minute

    return () => clearInterval(timer);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`mb-2 p-4 rounded-lg shadow-lg flex items-center justify-between ${
              notification.type === 'info'
                ? 'bg-blue-100 text-blue-800'
                : notification.type === 'success'
                ? 'bg-green-100 text-green-800'
                : notification.type === 'warning'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <div className="flex items-center">
              <Bell size={20} className="mr-2" />
              <p>{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;