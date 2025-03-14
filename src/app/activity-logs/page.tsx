"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, RefreshCw } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock activity log data
const activityLogsMockData = [
  {
    id: "ACT-001",
    timestamp: "2025-03-14T09:45:32",
    admin: "john.smith",
    action: "USER_CREATED",
    target: "user/emma.wilson",
    ip: "192.168.1.103",
    status: "success"
  },
  {
    id: "ACT-002",
    timestamp: "2025-03-14T10:12:05",
    admin: "admin.manager",
    action: "PRODUCT_UPDATED",
    target: "product/SKU-5829",
    ip: "192.168.1.105",
    status: "success"
  },
  {
    id: "ACT-003",
    timestamp: "2025-03-14T11:30:45",
    admin: "sarah.davis",
    action: "ORDER_REFUNDED",
    target: "order/ORD-29384",
    ip: "192.168.1.107",
    status: "success"
  },
  {
    id: "ACT-004",
    timestamp: "2025-03-14T13:25:18",
    admin: "john.smith",
    action: "SETTINGS_CHANGED",
    target: "settings/payment",
    ip: "192.168.1.103",
    status: "success"
  },
  {
    id: "ACT-005",
    timestamp: "2025-03-14T14:02:33",
    admin: "tech.support",
    action: "USER_PERMISSION_CHANGED",
    target: "user/sarah.davis",
    ip: "192.168.1.110",
    status: "warning"
  },
  {
    id: "ACT-006",
    timestamp: "2025-03-14T15:17:52",
    admin: "admin.manager",
    action: "INVENTORY_ADJUSTED",
    target: "product/SKU-1234",
    ip: "192.168.1.105",
    status: "success"
  },
  {
    id: "ACT-007",
    timestamp: "2025-03-14T16:45:29",
    admin: "sarah.davis",
    action: "LOGIN_FAILED",
    target: "auth/login",
    ip: "192.168.1.107",
    status: "error"
  },
  {
    id: "ACT-008",
    timestamp: "2025-03-14T17:03:11",
    admin: "tech.support",
    action: "SYSTEM_BACKUP",
    target: "system/backup",
    ip: "192.168.1.110",
    status: "success"
  },
  {
    id: "ACT-009",
    timestamp: "2025-03-14T17:30:45",
    admin: "john.smith",
    action: "DISCOUNT_CREATED",
    target: "marketing/discount-summer",
    ip: "192.168.1.103",
    status: "success"
  },
  {
    id: "ACT-010",
    timestamp: "2025-03-14T18:15:22",
    admin: "admin.manager",
    action: "USER_DELETED",
    target: "user/temp.account",
    ip: "192.168.1.105",
    status: "warning"
  }
];

// Action type options
const actionTypes = [
  "USER_CREATED",
  "USER_UPDATED",
  "USER_DELETED",
  "USER_PERMISSION_CHANGED",
  "PRODUCT_CREATED",
  "PRODUCT_UPDATED",
  "PRODUCT_DELETED",
  "ORDER_CREATED",
  "ORDER_UPDATED",
  "ORDER_REFUNDED",
  "LOGIN_SUCCEEDED",
  "LOGIN_FAILED",
  "SETTINGS_CHANGED",
  "INVENTORY_ADJUSTED",
  "SYSTEM_BACKUP",
  "DISCOUNT_CREATED"
];

// Admin users
const admins = [
  "john.smith",
  "admin.manager",
  "sarah.davis",
  "tech.support",
  "all"
];

export default function ActivityLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [filterAdmin, setFilterAdmin] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  // Filter and paginate logs
  const filteredLogs = activityLogsMockData.filter(log => {
    return (
      (searchQuery === "" || 
        log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ip.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterAction === "" || log.action === filterAction) &&
      (filterAdmin === "" || filterAdmin === "all" || log.admin === filterAdmin) &&
      (filterStatus === "" || log.status === filterStatus)
    );
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterAction("");
    setFilterAdmin("");
    setFilterStatus("");
    setCurrentPage(1);
  };

  // Get status badge color
  const getStatusColor = (status:string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#1F1F1F" }}>
        Activity Logs
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle style={{ color: "#4D0A51" }}>Admin Activity Tracker</CardTitle>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by ID, Target, or IP address..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleResetFilters}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Actions">All Actions</SelectItem>
                  {actionTypes.map(action => (
                    <SelectItem key={action} value={action}>
                      {action.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterAdmin} onValueChange={setFilterAdmin}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Admins">All Admins</SelectItem>
                  {admins.map(admin => (
                    <SelectItem key={admin} value={admin}>
                      {admin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Statuses">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Log Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Log ID</TableHead>
                    <TableHead className="w-36">Timestamp</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLogs.length > 0 ? (
                    paginatedLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.id}</TableCell>
                        <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                        <TableCell>{log.admin}</TableCell>
                        <TableCell>
                          <span className="font-mono text-xs">
                            {log.action}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{log.target}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(log.status)}`}>
                            {log.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No activity logs found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredLogs.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <PaginationItem key={pageNumber}>
                          <Button 
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            className="w-10 h-10 p-0"
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}