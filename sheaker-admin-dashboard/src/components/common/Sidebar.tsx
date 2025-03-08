"use client";
import { motion } from "framer-motion";
import { 
  FaTachometerAlt, 
  FaBox, 
  FaShoppingBag, 
  FaUsers, 
  FaCog, 
  FaTags,
  FaSignOutAlt, 
  FaChevronLeft 
} from "react-icons/fa";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Sidebar menu items
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FaTachometerAlt, href: "/" },
  // { id: "products", label: "Products", icon: FaBox, href: "/products" },
  { id: "orders", label: "Orders", icon: FaShoppingBag, href: "/orders" },
  { id: "users", label: "Users", icon: FaUsers, href: "/users" },
{ id: "settings", label: "Settings", icon: FaCog, href: "/account/settings" },
{ id: "discountsAndPromotions", label: "Discount/Promotions", icon: FaTags, href: "/discounts-and-promotions" },
];

// Animation variants
const sidebarVariants = {
  open: {
    width: "18rem",
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 1, 0.5, 1], 
      staggerChildren: 0.05,
      delayChildren: 0.1
    },
  },
  closed: {
    width: "4.5rem",
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.05,
      staggerDirection: -1
    },
  },
  mobileClosed: {
    x: "-100%",
    transition: { 
      duration: 0.4, 
      ease: [0.25, 1, 0.5, 1],
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
  closed: {
    opacity: 0.8,
    y: 0,
    transition: { duration: 0.4 }
  },
  hover: {
    scale: 1.03,
    backgroundColor: "rgba(251, 126, 17, 0.15)",
    boxShadow: "0 4px 12px rgba(251, 126, 17, 0.2)",
    transition: { duration: 0.2 },
  },
  active: {
    backgroundColor: "#0836C1",
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(8, 54, 193, 0.3)",
    transition: { duration: 0.2 },
  },
};

const textVariants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } },
  closed: { opacity: 0, x: -10, transition: { duration: 0.3 } },
};

const tooltipVariants = {
  hidden: { opacity: 0, x: -10, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.2 } },
};

// Define props type
interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<AdminSidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  const [isMobile, setIsMobile] = useState(false);

  // Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Determine if a menu item is active based on the current path
  const isItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className={cn("fixed inset-0 bg-black z-40", isAuthPage ? "hidden": "")}
          onClick={toggleSidebar}
        />
      )}
      
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : isMobile ? "mobileClosed" : "closed"}
        variants={sidebarVariants}
        className={cn(
          "bg-[#1F1F1F] fixed top-0 left-0 h-screen z-50 shadow-2xl font-roboto overflow-hidden",
          "md:w-auto w-full", isAuthPage ? "hidden": "")}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-[#4D0A51]/30">
          <Link href="/">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className={cn("text-2xl font-extrabold text-[#FB7E11]", !isOpen && "md:hidden")}
            >
              Sheaker
            </motion.div>
          </Link>
          <motion.button
            whileHover={{ 
              rotate: isOpen ? 180 : 0, 
              backgroundColor: "rgba(251, 126, 17, 0.15)",
            }}
            onClick={toggleSidebar}
            className="text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FB7E11] focus:ring-offset-2 focus:ring-offset-[#1F1F1F] transition-all"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <FaChevronLeft size={20} className={cn(isOpen && "rotate-180")} />
          </motion.button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 px-3 space-y-2">
          {menuItems.map((item) => {
            const active = isItemActive(item.href);
            return (
              <Link key={item.id} href={item.href} passHref>
                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                  animate={active ? "active" : ""}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 text-white rounded-xl cursor-pointer relative group",
                    active 
                      ? "bg-[#0836C1]" 
                      : "hover:bg-[#FB7E11]/10 transition-all duration-300"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={active ? 
                      { rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1.1, 1] } : 
                      { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                  >
                    <item.icon
                      size={22}
                      className={cn(
                        active ? 
                          "text-white" : 
                          "text-[#FB7E11] group-hover:text-white transition-colors duration-300"
                      )}
                    />
                  </motion.div>
                  <motion.span
                    variants={textVariants}
                    animate={isOpen ? "open" : "closed"}
                    className="text-base font-medium"
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Tooltip for collapsed sidebar */}
                  {!isOpen && (
                    <motion.span
                      initial="hidden"
                      whileHover="visible"
                      variants={tooltipVariants}
                      className="absolute left-16 bg-[#4D0A51] text-white text-sm px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:block hidden"
                      style={{ boxShadow: "0 4px 12px rgba(77, 10, 81, 0.3)" }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-8 px-3 w-full">
          <Link href="/auth/login">
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              className="flex items-center gap-4 px-4 py-3 text-white hover:bg-[#FB7E11]/10 rounded-xl cursor-pointer relative group transition-all duration-300"
            >
              <FaSignOutAlt size={22} className="text-[#FB7E11] group-hover:text-white transition-colors duration-300" />
              <motion.span
                variants={textVariants}
                animate={isOpen ? "open" : "closed"}
                className="text-base font-medium"
              >
                Logout
              </motion.span>
              
              {/* Tooltip for collapsed sidebar */}
              {!isOpen && (
                <motion.span
                  initial="hidden"
                  whileHover="visible"
                  variants={tooltipVariants}
                  className="absolute left-16 bg-[#4D0A51] text-white text-sm px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:block hidden"
                  style={{ boxShadow: "0 4px 12px rgba(77, 10, 81, 0.3)" }}
                >
                  Logout
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;