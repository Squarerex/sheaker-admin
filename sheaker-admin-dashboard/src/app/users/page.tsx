"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreHorizontal, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Brand colors
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F",
};

// Mock user data (replace with API call)
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@dropship.com", signupDate: "2025-01-15", role: "User", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@dropship.com", signupDate: "2025-02-01", role: "Admin", status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@dropship.com", signupDate: "2025-02-10", role: "User", status: "Inactive" },
  { id: 4, name: "Emily Brown", email: "emily@dropship.com", signupDate: "2025-03-01", role: "User", status: "Active" },
  { id: 5, name: "Alex Carter", email: "alex@dropship.com", signupDate: "2025-03-05", role: "Admin", status: "Inactive" },
  // Add more mock data as needed
];

// Animation variants
const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Configurable

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchTerm, roleFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleViewDetails = (user: typeof mockUsers[0]) => {
    alert(`Viewing details for ${user.name} (ID: ${user.id})`);
    // Implement modal or page navigation here
  };

  const handleEdit = (user: typeof mockUsers[0]) => {
    console.log(`Editing user: ${user.id}`);
    // Implement edit functionality (e.g., open a form)
  };

  const handleDelete = (user: typeof mockUsers[0]) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      console.log(`Deleting user: ${user.id}`);
      // Implement delete API call
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.dark }}>
            Registered Users
          </h1>
          {/* <Button style={{ backgroundColor: colors.primary }} className="text-white">
            Add New User
          </Button> */}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select onValueChange={setRoleFilter} defaultValue="">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setStatusFilter} defaultValue="">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Statuses">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Signup Date</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    className="hover:bg-gray-50"
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.signupDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          user.role === "Admin" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        )}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        )}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}