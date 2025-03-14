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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, MoreHorizontal, Eye, ChevronLeft, ChevronRight, Check, X, RefreshCw, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa";

// Brand colors
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F",
};

// Mock order data (replace with API call)
const mockOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2025-03-01",
    total: 149.99,
    status: "Processing",
    items: [
      { name: "Sneakers X1", quantity: 2, price: 59.99 },
      { name: "T-Shirt Pro", quantity: 1, price: 30.00 },
    ],
    shipping: { address: "123 Main St, NY", method: "Standard", trackingId: "TRK123456789" },
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2025-03-02",
    total: 299.50,
    status: "Completed",
    items: [
      { name: "Jacket Elite", quantity: 1, price: 199.50 },
      { name: "Cap Classic", quantity: 2, price: 50.00 },
    ],
    shipping: { address: "456 Oak Ave, CA", method: "Express", trackingId: "TRK987654321" },
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    date: "2025-03-03",
    total: 89.99,
    status: "Refunded",
    items: [{ name: "Sneakers X2", quantity: 1, price: 89.99 }],
    shipping: { address: "789 Pine Rd, TX", method: "Standard", trackingId: "TRK456789123" },
  },
  {
    id: "ORD004",
    customer: "Emily Brown",
    date: "2025-03-04",
    total: 0.00,
    status: "Cancelled",
    items: [{ name: "Hoodie Basic", quantity: 1, price: 45.00 }],
    shipping: { address: "321 Elm St, FL", method: "Standard", trackingId: "TRK321654987" },
  },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || statusFilter === "All Statuses" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle order selection for bulk actions
  const handleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  // Bulk update order status
  const handleBulkStatusUpdate = (status: string) => {
    console.log(`Updating orders ${selectedOrders.join(", ")} to ${status}`);
    setSelectedOrders([]); // Clear selection after update
  };

  // Handle order status update
  const handleUpdateStatus = (orderId: string, status: string) => {
    console.log(`Updating order ${orderId} to ${status}`);
  };

  // Handle refund issuance
  const handleIssueRefund = (orderId: string) => {
    console.log(`Issuing refund for order ${orderId}`);
  };

  // Handle return approval
  const handleApproveReturn = (orderId: string) => {
    console.log(`Approving return for order ${orderId}`);
  };

  // Mock shipping tracking API
  const trackShipment = (trackingId: string) => {
    console.log(`Tracking shipment with ID: ${trackingId}`);
    // Integrate with a third-party API like FedEx, UPS, or DHL here
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
            Orders
          </h1>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select onValueChange={setStatusFilter} defaultValue="">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Statuses">All Statuses</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="mb-4 flex items-center gap-4">
            <p className="text-sm text-gray-500">
              {selectedOrders.length} orders selected
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Bulk Actions <FaChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Processing")}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Mark as Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Completed")}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Cancelled")}>
                  <X className="mr-2 h-4 w-4" />
                  Mark as Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === paginatedOrders.length}
                    onChange={(e) =>
                      setSelectedOrders(
                        e.target.checked ? paginatedOrders.map((order) => order.id) : []
                      )
                    }
                  />
                </TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleOrderSelection(order.id)}
                      />
                    </TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell className="font-medium">{order.customer}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          {
                            "bg-blue-100 text-blue-800": order.status === "Processing",
                            "bg-green-100 text-green-800": order.status === "Completed",
                            "bg-red-100 text-red-800": order.status === "Cancelled",
                            "bg-purple-100 text-purple-800": order.status === "Refunded",
                          }
                        )}
                      >
                        {order.status}
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
                          <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Completed")}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Cancelled")}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIssueRefund(order.id)}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Issue Refund
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleApproveReturn(order.id)}>
                            <Truck className="mr-2 h-4 w-4" />
                            Approve Return
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {filteredOrders.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
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
              Page {currentPage} of {Math.max(totalPages, 1)}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Order Details Modal */}
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent>
            {selectedOrder && (
              <div>
                <DialogHeader>
                  <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Customer</h3>
                      <p>{selectedOrder.customer}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Order Date</h3>
                      <p>{new Date(selectedOrder.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Total</h3>
                      <p>${selectedOrder.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Status</h3>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          {
                            "bg-blue-100 text-blue-800": selectedOrder.status === "Processing",
                            "bg-green-100 text-green-800": selectedOrder.status === "Completed",
                            "bg-red-100 text-red-800": selectedOrder.status === "Cancelled",
                            "bg-purple-100 text-purple-800": selectedOrder.status === "Refunded",
                          }
                        )}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Shipping Details</h3>
                    <p><strong>Address:</strong> {selectedOrder.shipping.address}</p>
                    <p><strong>Method:</strong> {selectedOrder.shipping.method}</p>
                    <p><strong>Tracking ID:</strong> {selectedOrder.shipping.trackingId}</p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => trackShipment(selectedOrder.shipping.trackingId)}
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Track Shipment
                    </Button>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                      Close
                    </Button>
                    <Button
                      style={{ backgroundColor: colors.primary }}
                      onClick={() => handleUpdateStatus(selectedOrder.id, "Completed")}
                    >
                      Update Status
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}