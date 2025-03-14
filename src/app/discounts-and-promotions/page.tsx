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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Brand colors
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F",
};

// Mock coupon data (replace with API call)
const mockCoupons: {
  id: number;
  code: string;
  discount: number;
  type: "Percentage" | "Fixed";
  usage: number;
  totalValue: number;
  status: string;
  expiry: string;
  autoDiscount: boolean;
  campaign: string | null;
  flashSale: boolean;
  bogo: boolean;
  bundle: boolean;
}[] = [
  {
    id: 1,
    code: "SAVE10",
    discount: 10,
    type: "Percentage",
    usage: 25,
    totalValue: 500.0,
    status: "Active",
    expiry: "2025-12-31",
    autoDiscount: false,
    campaign: null,
    flashSale: false,
    bogo: false,
    bundle: false,
  },
  {
    id: 2,
    code: "FLAT20",
    discount: 20,
    type: "Fixed",
    usage: 15,
    totalValue: 300.0,
    status: "Active",
    expiry: "2025-06-30",
    autoDiscount: true,
    campaign: "Summer Sale",
    flashSale: false,
    bogo: false,
    bundle: false,
  },
  {
    id: 3,
    code: "WELCOME15",
    discount: 15,
    type: "Percentage",
    usage: 50,
    totalValue: 750.0,
    status: "Inactive",
    expiry: "2025-03-01",
    autoDiscount: false,
    campaign: null,
    flashSale: false,
    bogo: false,
    bundle: false,
  },
];

// Animation variants
const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

export default function DiscountsPage() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    type: "Percentage" as "Percentage" | "Fixed",
    expiry: "",
    status: true,
    autoDiscount: false,
    campaign: null as string | null,
    flashSale: false,
    bogo: false,
    bundle: false,
  });

  // Filter logic
  const filteredCoupons = useMemo(() => {
    return mockCoupons.filter((coupon) => {
      const matchesStatus =
        !statusFilter ||
        (statusFilter === "Active"
          ? coupon.status === "Active"
          : coupon.status === "Inactive");
      return matchesStatus;
    });
  }, [statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCoupons.length / rowsPerPage);
  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCreateCoupon = () => {
    const coupon = {
      id: mockCoupons.length + 1,
      code: newCoupon.code.toUpperCase(),
      discount: parseFloat(newCoupon.discount),
      type: newCoupon.type,
      usage: 0,
      totalValue: 0,
      status: newCoupon.status ? "Active" : "Inactive",
      expiry: newCoupon.expiry,
      autoDiscount: newCoupon.autoDiscount,
      campaign: newCoupon.campaign,
      flashSale: newCoupon.flashSale,
      bogo: newCoupon.bogo,
      bundle: newCoupon.bundle,
    };
    console.log("Creating coupon:", coupon);
    // Add API call here to save coupon
    mockCoupons.push(coupon); // Mock addition
    setIsCreateModalOpen(false);
    setNewCoupon({
      code: "",
      discount: "",
      type: "Percentage",
      expiry: "",
      status: true,
      autoDiscount: false,
      campaign: null,
      flashSale: false,
      bogo: false,
      bundle: false,
    });
  };

  const handleEdit = (coupon: typeof mockCoupons[0]) => {
    setEditingCoupon(coupon);
    setIsEditModalOpen(true);
  };

  const handleUpdateCoupon = () => {
    if (editingCoupon) {
      console.log("Updating coupon:", editingCoupon);
      // Add API call here to update coupon
      const index = mockCoupons.findIndex((c) => c.id === editingCoupon.id);
      if (index !== -1) {
        mockCoupons[index] = editingCoupon; // Mock update
      }
      setIsEditModalOpen(false);
      setEditingCoupon(null);
    }
  };

  const handleDelete = (coupon: typeof mockCoupons[0]) => {
    if (confirm(`Are you sure you want to delete ${coupon.code}?`)) {
      console.log(`Deleting coupon: ${coupon.id}`);
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
            Discounts & Promotions
          </h1>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button
                style={{ backgroundColor: colors.primary }}
                className="text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Coupon
              </Button>
            </DialogTrigger>
            <DialogContent>
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                className="sm:max-w-[500px]"
              >
                <DialogHeader>
                  <DialogTitle>Create New Coupon</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Coupon Code</label>
                    <Input
                      value={newCoupon.code}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, code: e.target.value })
                      }
                      placeholder="e.g., SAVE10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount Amount</label>
                    <Input
                      type="number"
                      value={newCoupon.discount}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, discount: e.target.value })
                      }
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount Type</label>
                    <Select
                      value={newCoupon.type}
                      onValueChange={(value) =>
                        setNewCoupon({
                          ...newCoupon,
                          type: value as "Percentage" | "Fixed",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Percentage">
                          Percentage (%)
                        </SelectItem>
                        <SelectItem value="Fixed">Fixed Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input
                      type="date"
                      value={newCoupon.expiry}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, expiry: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newCoupon.status}
                      onCheckedChange={(checked) =>
                        setNewCoupon({ ...newCoupon, status: checked })
                      }
                    />
                    <label className="text-sm font-medium">Active</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newCoupon.autoDiscount}
                      onCheckedChange={(checked) =>
                        setNewCoupon({ ...newCoupon, autoDiscount: checked })
                      }
                    />
                    <label className="text-sm font-medium">Auto-Discount</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newCoupon.flashSale}
                      onCheckedChange={(checked) =>
                        setNewCoupon({ ...newCoupon, flashSale: checked })
                      }
                    />
                    <label className="text-sm font-medium">Flash Sale</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newCoupon.bogo}
                      onCheckedChange={(checked) =>
                        setNewCoupon({ ...newCoupon, bogo: checked })
                      }
                    />
                    <label className="text-sm font-medium">BOGO</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newCoupon.bundle}
                      onCheckedChange={(checked) =>
                        setNewCoupon({ ...newCoupon, bundle: checked })
                      }
                    />
                    <label className="text-sm font-medium">Bundle Deal</label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Campaign Name</label>
                    <Input
                      value={newCoupon.campaign || ""}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, campaign: e.target.value })
                      }
                      placeholder="e.g., Summer Sale"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ backgroundColor: colors.primary }}
                      onClick={handleCreateCoupon}
                      disabled={
                        !newCoupon.code || !newCoupon.discount || !newCoupon.expiry
                      }
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
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

        {/* Coupons Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Auto-Discount</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Flash Sale</TableHead>
                <TableHead>BOGO</TableHead>
                <TableHead>Bundle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCoupons.length > 0 ? (
                paginatedCoupons.map((coupon) => (
                  <motion.tr
                    key={coupon.id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{coupon.code}</TableCell>
                    <TableCell>
                      {coupon.discount}
                      {coupon.type === "Percentage" ? "%" : "$"}
                    </TableCell>
                    <TableCell>{coupon.type}</TableCell>
                    <TableCell>{coupon.usage}</TableCell>
                    <TableCell>${coupon.totalValue.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          coupon.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        )}
                      >
                        {coupon.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(coupon.expiry).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{coupon.autoDiscount ? "Yes" : "No"}</TableCell>
                    <TableCell>{coupon.campaign || "-"}</TableCell>
                    <TableCell>{coupon.flashSale ? "Yes" : "No"}</TableCell>
                    <TableCell>{coupon.bogo ? "Yes" : "No"}</TableCell>
                    <TableCell>{coupon.bundle ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(coupon)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(coupon)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-4">
                    No coupons found
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
            {Math.min(currentPage * rowsPerPage, filteredCoupons.length)} of{" "}
            {filteredCoupons.length} coupons
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

      {/* Edit Coupon Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            className="sm:max-w-[500px]"
          >
            <DialogHeader>
              <DialogTitle>Edit Coupon</DialogTitle>
            </DialogHeader>
            {editingCoupon && (
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Coupon Code</label>
                  <Input
                    value={editingCoupon.code}
                    onChange={(e) =>
                      setEditingCoupon({ ...editingCoupon, code: e.target.value })
                    }
                    placeholder="e.g., SAVE10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Amount</label>
                  <Input
                    type="number"
                    value={editingCoupon.discount}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        discount: parseFloat(e.target.value),
                      })
                    }
                    placeholder="e.g., 10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Type</label>
                  <Select
                    value={editingCoupon.type}
                    onValueChange={(value) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        type: value as "Percentage" | "Fixed",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage (%)</SelectItem>
                      <SelectItem value="Fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input
                    type="date"
                    value={editingCoupon.expiry}
                    onChange={(e) =>
                      setEditingCoupon({ ...editingCoupon, expiry: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingCoupon.status === "Active"}
                    onCheckedChange={(checked) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        status: checked ? "Active" : "Inactive",
                      })
                    }
                  />
                  <label className="text-sm font-medium">Active</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingCoupon.autoDiscount}
                    onCheckedChange={(checked) =>
                      setEditingCoupon({ ...editingCoupon, autoDiscount: checked })
                    }
                  />
                  <label className="text-sm font-medium">Auto-Discount</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingCoupon.flashSale}
                    onCheckedChange={(checked) =>
                      setEditingCoupon({ ...editingCoupon, flashSale: checked })
                    }
                  />
                  <label className="text-sm font-medium">Flash Sale</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingCoupon.bogo}
                    onCheckedChange={(checked) =>
                      setEditingCoupon({ ...editingCoupon, bogo: checked })
                    }
                  />
                  <label className="text-sm font-medium">BOGO</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingCoupon.bundle}
                    onCheckedChange={(checked) =>
                      setEditingCoupon({ ...editingCoupon, bundle: checked })
                    }
                  />
                  <label className="text-sm font-medium">Bundle Deal</label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Name</label>
                  <Input
                    value={editingCoupon.campaign || ""}
                    onChange={(e) =>
                      setEditingCoupon({ ...editingCoupon, campaign: e.target.value })
                    }
                    placeholder="e.g., Summer Sale"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ backgroundColor: colors.primary }}
                    onClick={handleUpdateCoupon}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}