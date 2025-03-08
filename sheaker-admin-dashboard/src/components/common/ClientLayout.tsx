"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { cn } from "@/lib/utils";
import {usePathname} from 'next/navigation'

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`flex `}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={cn(
          "flex-1 transition-all duration-400 ease-in-out",
          isSidebarOpen ? "md:ml-[18rem] ml-0" : "md:ml-[4.5rem] ml-0"
        )}
      >
        <Header setIsSidebarOpen={setIsSidebarOpen} className={`${isAuthPage ? "hidden bg-gradient-to-br from-[#0836C1] via-[#4D0A51] to-[#FB7E11] ": ""}`} />
        <main className="pt-16 p-6">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;