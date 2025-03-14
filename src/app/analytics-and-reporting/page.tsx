"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
// import { exportToCSV, exportToPDF } from "@/lib/export-utils"; 

// Import Recharts components
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Mock data for charts
const salesData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 14000 },
  { month: "May", revenue: 20000 },
  { month: "Jun", revenue: 22000 },
];

const customerBehaviorData = [
  { category: "New Customers", value: 40 },
  { category: "Returning Customers", value: 60 },
];

const orderData = [
  { status: "Completed", count: 120 },
  { status: "Pending", count: 30 },
  { status: "Refunded", count: 10 },
];

const inventoryData = [
  { product: "Product A", stock: 50 },
  { product: "Product B", stock: 30 },
  { product: "Product C", stock: 20 },
];

// const marketingData = [
//   { campaign: "Summer Sale", roi: 25 },
//   { campaign: "Black Friday", roi: 40 },
//   { campaign: "Holiday Promo", roi: 35 },
// ];

const profitLossData = [
  { month: "Jan", profit: 5000, loss: 1000 },
  { month: "Feb", profit: 7000, loss: 1500 },
  { month: "Mar", profit: 9000, loss: 2000 },
  { month: "Apr", profit: 6000, loss: 1200 },
  { month: "May", profit: 10000, loss: 2500 },
  { month: "Jun", profit: 12000, loss: 3000 },
];

// Chart color constants
const COLORS = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  tertiary: "#4D0A51"
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("sales");

  // Export functions
  const handleExportCSV = () => {
    // exportToCSV(salesData, "sales_report.csv");
    toast.success("CSV exported successfully!");
  };

  const handleExportPDF = () => {
    // exportToPDF("sales-report", "sales_report.pdf");
    toast.success("PDF exported successfully!");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#1F1F1F" }}>
        Analytics & Reporting
      </h1>

      {/* Tabs for Navigation */}
      <Tabs defaultValue="sales" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 gap-2 mb-6">
          <TabsTrigger value="sales" className="text-sm">
            Sales Trends
          </TabsTrigger>
          <TabsTrigger value="customer" className="text-sm">
            Customer Behavior
          </TabsTrigger>
          <TabsTrigger value="orders" className="text-sm">
            Orders & Refunds
          </TabsTrigger>
          <TabsTrigger value="inventory" className="text-sm">
            Inventory
          </TabsTrigger>
          {/* <TabsTrigger value="marketing" className="text-sm">
            Marketing
          </TabsTrigger> */}
          <TabsTrigger value="profit" className="text-sm">
            Profit & Loss
          </TabsTrigger>
        </TabsList>

        {/* Sales Trends Tab */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle style={{ color: "#4D0A51" }}>Sales Trends & Revenue Reports</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleExportCSV}
                    className="flex items-center gap-2"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExportPDF}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <p className="text-lg font-medium mb-4">Monthly Revenue</p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={COLORS.primary} 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Behavior Tab */}
        <TabsContent value="customer">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#4D0A51" }}>Customer Behavior Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <p className="text-lg font-medium mb-4">Customer Distribution</p>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerBehaviorData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerBehaviorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.secondary : COLORS.primary} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders & Refunds Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#4D0A51" }}>Order & Refund Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <p className="text-lg font-medium mb-4">Order Status</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill={COLORS.tertiary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#4D0A51" }}>Inventory & Stock Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <p className="text-lg font-medium mb-4">Stock Levels</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="stock" fill={COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marketing Tab */}
        {/* <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#4D0A51" }}>Marketing Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <p className="text-lg font-medium mb-4">ROI by Campaign</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="campaign" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="roi" fill={COLORS.secondary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}

        {/* Profit & Loss Tab */}
        <TabsContent value="profit">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#4D0A51" }}>Profit & Loss Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <p className="text-lg font-medium mb-4">Monthly Profit & Loss</p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitLossData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke={COLORS.primary} 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="loss" 
                      stroke={COLORS.secondary} 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}