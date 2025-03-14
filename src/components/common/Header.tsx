"use client";
import { motion } from "framer-motion";
import { FaBell, FaUser, FaSignOutAlt, FaCog, FaTrash, FaCheck } from "react-icons/fa";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface AdminHeaderProps {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  className: string;
}

const Header: React.FC<AdminHeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Toggle user menu
  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);

  // Toggle notification sheet
  const toggleNotificationSheet = () => setIsNotificationSheetOpen((prev) => !prev);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Notification data
  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      description: "Order #12345 has been placed.",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment Successful",
      description: "Payment for Order #12345 has been processed.",
      timestamp: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      title: "New Message",
      description: "You have a new message from a customer.",
      timestamp: "1 day ago",
      read: false,
    },
  ];

  // Mark notification as read
  const markAsRead = (id: number) => {
    console.log(`Marked notification ${id} as read`);
  };

  // Delete notification
  const deleteNotification = (id: number) => {
    console.log(`Deleted notification ${id}`);
  };

  // Animation variants
  const notificationBadgeVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { type: "spring", stiffness: 500, damping: 20 } },
    hover: { scale: 1.2, transition: { duration: 0.2 } }
  };

  const userMenuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <header className={cn("bg-[#1F1F1F] fixed top-0 left-0 w-full z-40 shadow-lg font-roboto", isAuthPage ? "hidden" : "", className)}>
      <div className={cn("flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto")}>
        <div className="flex items-center gap-4">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="text-2xl font-bold relative ml-10"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FB7E11] to-[#0836C1]">
                Sheaker
              </span>
              <span className="text-white font-medium text-lg ml-2 hidden sm:inline-block">Admin</span>
            </motion.div>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <motion.div
            className="relative text-gray-300 hover:text-[#FB7E11] cursor-pointer transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleNotificationSheet}
          >
            <FaBell size={20} />
            <motion.span
              className="absolute -top-1 -right-1 bg-[#FB7E11] text-[#1F1F1F] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={notificationBadgeVariants}
            >
              {notifications.filter((n) => !n.read).length}
            </motion.span>
          </motion.div>

          {/* Notification Sheet */}
          <Sheet open={isNotificationSheetOpen} onOpenChange={setIsNotificationSheetOpen}>
            <SheetContent className="bg-[#2D2D2D] text-white">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">Notifications</SheetTitle>
                <SheetDescription className="text-gray-400">
                  You have {notifications.filter((n) => !n.read).length} new notifications.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 rounded-lg transition-all",
                      notification.read ? "bg-[#3A3A3A]" : "bg-[#FB7E11]/10"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{notification.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{notification.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                      </div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 rounded-full hover:bg-[#FB7E11]/20 transition-colors"
                            aria-label="Mark as read"
                          >
                            <FaCheck className="text-[#FB7E11]" size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
                          aria-label="Delete notification"
                        >
                          <FaTrash className="text-red-500" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <motion.button
              className="flex items-center gap-2 text-gray-300 hover:text-[#FB7E11] focus:outline-none focus:ring-2 focus:ring-[#0836C1] p-2 rounded-md transition-all"
              onClick={toggleUserMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#0836C1] to-[#4D0A51] flex items-center justify-center overflow-hidden">
                <FaUser size={16} className="text-white" />
              </div>
              <span className="hidden sm:inline font-medium text-white">Admin</span>
            </motion.button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-[#2D2D2D] rounded-lg shadow-xl overflow-hidden z-50"
                initial="hidden"
                animate="visible"
                variants={userMenuVariants}
                exit="hidden"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(77, 10, 81, 0.2)"
                }}
              >
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm text-white font-medium">Admin User</p>
                  <p className="text-xs text-gray-400 mt-1">aboyejiemmanuel07@gmail.com</p>
                </div>
                <div className="py-2">
                  <motion.a
                    href="/account/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#0836C1] hover:text-white transition-colors"
                    variants={menuItemVariants}
                  >
                    <FaUser className="mr-3 text-[#FB7E11]" size={16} />
                    Your Profile
                  </motion.a>
                  <motion.a
                    href="/account/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#0836C1] hover:text-white transition-colors"
                    variants={menuItemVariants}
                  >
                    <FaCog className="mr-3 text-[#FB7E11]" size={16} />
                    Settings
                  </motion.a>
                  <motion.a
                    href="/auth/login"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#FB7E11]/90 hover:text-white transition-colors"
                    variants={menuItemVariants}
                  >
                    <FaSignOutAlt className="mr-3 text-[#FB7E11]" size={16} />
                    Sign out
                  </motion.a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;