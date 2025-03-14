"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash, Upload, AlertCircle, Tag, List, Star, Check, X, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Brand colors
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F",
};

// Mock product data (replace with API call)
const mockProducts = [
  {
    id: "PROD001",
    name: "Men's Sneakers",
    category: "Footwear",
    price: 99.99,
    discount: 10, // 10% discount
    stock: 50,
    variations: [
      { size: "10", color: "Black", material: "Leather" },
      { size: "11", color: "White", material: "Canvas" },
    ],
    reviews: [
      { rating: 4, comment: "Great product!", status: "approved" },
      { rating: 5, comment: "Very comfortable.", status: "pending" },
    ],
  },
  {
    id: "PROD002",
    name: "Women's Jacket",
    category: "Outerwear",
    price: 149.99,
    discount: 0, // No discount
    stock: 10,
    variations: [
      { size: "M", color: "Red", material: "Polyester" },
      { size: "L", color: "Blue", material: "Nylon" },
    ],
    reviews: [
      { rating: 3, comment: "Good, but runs small.", status: "approved" },
    ],
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Filter products based on search term
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle product deletion
  const handleDeleteProduct = (productId: string) => {
    console.log(`Deleting product ${productId}`);
    setIsDeleteConfirmationOpen(false);
  };

  // Handle bulk upload via API
  const handleBulkUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/products/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Bulk upload successful:", data);
      setIsBulkUploadModalOpen(false);
    } catch (error) {
      console.error("Bulk upload failed:", error);
    }
  };

  // Handle review moderation
  const handleReviewModeration = (reviewId: string, action: "approve" | "reject") => {
    console.log(`${action} review ${reviewId}`);
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
            Products
          </h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsAddProductModalOpen(true)}
              style={{ backgroundColor: colors.primary }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button
              // onClick={() => setIsBulkUploadModalOpen(true)}
              variant="outline"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Bulk API Upload
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Variations</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {product.discount > 0 ? (
                        <span className="text-green-600">{product.discount}% off</span>
                      ) : (
                        <span className="text-gray-500">No discount</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn("px-2 py-1 rounded-full text-xs font-medium", {
                          "bg-red-100 text-red-800": product.stock < 20,
                          "bg-green-100 text-green-800": product.stock >= 20,
                        })}
                      >
                        {product.stock} in stock
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <List className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {product.variations.map((variation, index) => (
                            <DropdownMenuItem key={index}>
                              Size: {variation.size}, Color: {variation.color}, Material: {variation.material}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsReviewModalOpen(true);
                        }}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedProduct(product);
                            setIsEditProductModalOpen(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedProduct(product);
                            setIsDeleteConfirmationOpen(true);
                          }}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Add Product Modal */}
        <Dialog open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Product Name" />
              <Input placeholder="Category" />
              <Input placeholder="Price" type="number" />
              <Input placeholder="Discount (%)" type="number" />
              <Input placeholder="Stock" type="number" />
              <Button style={{ backgroundColor: colors.primary }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Product Modal */}
        <Dialog open={isEditProductModalOpen} onOpenChange={setIsEditProductModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Product Name" defaultValue={selectedProduct?.name} />
              <Input placeholder="Category" defaultValue={selectedProduct?.category} />
              <Input placeholder="Price" type="number" defaultValue={selectedProduct?.price} />
              <Input placeholder="Discount (%)" type="number" defaultValue={selectedProduct?.discount} />
              <Input placeholder="Stock" type="number" defaultValue={selectedProduct?.stock} />
              <Button style={{ backgroundColor: colors.primary }}>
                <Edit className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this product?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteConfirmationOpen(false)}>
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: colors.secondary }}
                onClick={() => selectedProduct && handleDeleteProduct(selectedProduct.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        

        {/* Bulk Upload Modal */}
        {/* <Dialog open={isBulkUploadModalOpen} onOpenChange={setIsBulkUploadModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bulk Upload Products</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input type="file" accept=".csv" onChange={(e) => e.target.files && handleBulkUpload(e.target.files[0])} />
              <Button style={{ backgroundColor: colors.primary }}>
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
              </Button>
            </div>
          </DialogContent>
        </Dialog> */}

        {/* Reviews Moderation Modal */}
        <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reviews for {selectedProduct?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedProduct?.reviews.map((review, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{review.rating} Stars</p>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleReviewModeration(index.toString(), "approve")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleReviewModeration(index.toString(), "reject")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}