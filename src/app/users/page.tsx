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
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  AlertCircle, 
  Clock 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Brand colors
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F",
};

// Enhanced mock user data with segmentation and login activity
const mockUsers = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@dropship.com", 
    signupDate: "2025-01-15", 
    role: "User", 
    status: "Active",
    segment: "VIP",
    totalOrders: 42,
    totalSpent: 4850,
    lastLoginDate: "2025-03-12T14:32:00",
    loginActivity: [
      { date: "2025-03-12T14:32:00", ip: "192.168.1.1", device: "Chrome/Mac" },
      { date: "2025-03-10T09:15:00", ip: "192.168.1.1", device: "Chrome/Mac" },
      { date: "2025-03-07T18:45:00", ip: "192.168.1.1", device: "Mobile/iOS" },
    ]
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@dropship.com", 
    signupDate: "2025-02-01", 
    role: "Admin", 
    status: "Active",
    segment: "Frequent Buyer",
    totalOrders: 18,
    totalSpent: 1920,
    lastLoginDate: "2025-03-13T10:15:00",
    loginActivity: [
      { date: "2025-03-13T10:15:00", ip: "203.0.113.1", device: "Firefox/Windows" },
      { date: "2025-03-12T16:22:00", ip: "203.0.113.1", device: "Firefox/Windows" },
      { date: "2025-03-11T11:05:00", ip: "198.51.100.1", device: "Mobile/Android" },
    ]
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    email: "mike@dropship.com", 
    signupDate: "2025-02-10", 
    role: "User", 
    status: "Inactive",
    segment: "New Customer",
    totalOrders: 2,
    totalSpent: 150,
    lastLoginDate: "2025-03-01T08:45:00",
    loginActivity: [
      { date: "2025-03-01T08:45:00", ip: "198.51.100.7", device: "Safari/Mac" },
      { date: "2025-02-28T12:30:00", ip: "198.51.100.7", device: "Safari/Mac" },
    ]
  },
  { 
    id: 4, 
    name: "Emily Brown", 
    email: "emily@dropship.com", 
    signupDate: "2025-03-01", 
    role: "User", 
    status: "Active",
    segment: "Frequent Buyer",
    totalOrders: 12,
    totalSpent: 980,
    lastLoginDate: "2025-03-13T09:20:00",
    loginActivity: [
      { date: "2025-03-13T09:20:00", ip: "172.16.254.1", device: "Edge/Windows" },
      { date: "2025-03-12T14:15:00", ip: "172.16.254.1", device: "Edge/Windows" },
      { date: "2025-03-09T17:40:00", ip: "172.16.254.2", device: "Mobile/Android" },
    ]
  },
  { 
    id: 5, 
    name: "Alex Carter", 
    email: "alex@dropship.com", 
    signupDate: "2025-03-05", 
    role: "Admin", 
    status: "Inactive",
    segment: "New Customer",
    totalOrders: 1,
    totalSpent: 49,
    lastLoginDate: "2025-03-06T10:10:00",
    loginActivity: [
      { date: "2025-03-06T10:10:00", ip: "172.16.254.10", device: "Chrome/Windows" },
    ]
  },
];

// Customer segment definitions
const customerSegments = [
  { name: "VIP", description: "Premium customers with high order value", minSpent: 3000, minOrders: 30 },
  { name: "Frequent Buyer", description: "Regular customers with consistent orders", minSpent: 500, minOrders: 10 },
  { name: "New Customer", description: "Recently joined with few orders", minSpent: 0, minOrders: 0 },
];

// Animation variants
const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Configurable
  
  // Modal states
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = !roleFilter || roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = !statusFilter || statusFilter === "All Statuses" || user.status === statusFilter;
      const matchesSegment = !segmentFilter || segmentFilter === "All Segments" || user.segment === segmentFilter;
      return matchesSearch && matchesRole && matchesStatus && matchesSegment;
    });
  }, [searchTerm, roleFilter, statusFilter, segmentFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleViewDetails = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
    setCurrentTab("profile");
  };

  const handleEdit = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: typeof mockUsers[0]) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      console.log(`Deleting user: ${user.id}`);
      // Implement delete API call
    }
  };

  const handleStatusChange = (user: typeof mockUsers[0], newStatus: string) => {
    console.log(`Changing status for user ${user.id} to ${newStatus}`);
    // Implement status change API call
  };

  const getSegmentBadgeColor = (segment: string) => {
    switch (segment) {
      case "VIP":
        return "bg-purple-100 text-purple-800";
      case "Frequent Buyer":
        return "bg-blue-100 text-blue-800";
      case "New Customer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
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
            User Management
          </h1>
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
          <Select onValueChange={setSegmentFilter} defaultValue="">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by Segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Segments">All Segments</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Frequent Buyer">Frequent Buyer</SelectItem>
              <SelectItem value="New Customer">New Customer</SelectItem>
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
                <TableHead>Segment</TableHead>
                <TableHead>Last Login</TableHead>
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
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          getSegmentBadgeColor(user.segment)
                        )}
                      >
                        {user.segment}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs">{new Date(user.lastLoginDate).toLocaleDateString()}</span>
                      </div>
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
                          {user.status === "Active" ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(user, "Inactive")}>
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(user, "Active")}>
                              <Shield className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
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
                  <TableCell colSpan={9} className="text-center py-4">
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

        {/* User Details Modal */}
        {selectedUser && (
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">User Profile: {selectedUser.name}</DialogTitle>
                <DialogDescription>
                  User ID: {selectedUser.id} | Registered: {new Date(selectedUser.signupDate).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="activity">Login Activity</TabsTrigger>
                  <TabsTrigger value="segment">Customer Segment</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Name</h3>
                      <p>{selectedUser.name}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p>{selectedUser.email}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Role</h3>
                      <Badge variant="outline">{selectedUser.role}</Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <Badge variant={selectedUser.status === "Active" ? "default" : "destructive"}>
                        {selectedUser.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                      <p>{selectedUser.totalOrders}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                      <p>${selectedUser.totalSpent.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
                    <Button onClick={() => {
                      setIsViewModalOpen(false);
                      setIsEditModalOpen(true);
                    }}>Edit User</Button>
                  </div>
                </TabsContent>
                <TabsContent value="activity">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Login History</h3>
                      <Badge variant="outline">Last login: {formatDateTime(selectedUser.lastLoginDate)}</Badge>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Device & Browser</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedUser.loginActivity.map((login, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{formatDateTime(login.date)}</TableCell>
                            <TableCell>{login.ip}</TableCell>
                            <TableCell>{login.device}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="segment">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium">Customer Segment:</h3>
                      <Badge className={cn(
                        "text-sm",
                        getSegmentBadgeColor(selectedUser.segment)
                      )}>
                        {selectedUser.segment}
                      </Badge>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Segment Criteria:</h4>
                      {customerSegments.find(seg => seg.name === selectedUser.segment)?.description}
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-4">
                      <div className="bg-white p-4 rounded-md border">
                        <h4 className="text-sm text-gray-500 mb-1">Total Orders</h4>
                        <p className="text-2xl font-bold">{selectedUser.totalOrders}</p>
                      </div>
                      <div className="bg-white p-4 rounded-md border">
                        <h4 className="text-sm text-gray-500 mb-1">Total Spent</h4>
                        <p className="text-2xl font-bold">${selectedUser.totalSpent.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md text-blue-700 text-sm">
                      <p className="font-medium">Segment Thresholds</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>VIP: ${customerSegments[0].minSpent}+ spent, {customerSegments[0].minOrders}+ orders</li>
                        <li>Frequent Buyer: ${customerSegments[1].minSpent}+ spent, {customerSegments[1].minOrders}+ orders</li>
                        <li>New Customer: Default for new users</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit User Modal */}
        {selectedUser && (
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User: {selectedUser.name}</DialogTitle>
                <DialogDescription>
                  Make changes to user information and permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Name</label>
                  <Input defaultValue={selectedUser.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Email</label>
                  <Input defaultValue={selectedUser.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Role</label>
                  <Select defaultValue={selectedUser.role}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={selectedUser.role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Status</label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={selectedUser.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Segment</label>
                  <Select defaultValue={selectedUser.segment}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={selectedUser.segment} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VIP">VIP</SelectItem>
                      <SelectItem value="Frequent Buyer">Frequent Buyer</SelectItem>
                      <SelectItem value="New Customer">New Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  console.log("Saving user updates");
                  setIsEditModalOpen(false);
                }}>Save Changes</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </div>
  );
}