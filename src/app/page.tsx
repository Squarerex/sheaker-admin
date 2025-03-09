// pages/dashboard.js
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  BarChart
} from "lucide-react";

// Custom theme colors 
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F"
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">          
        
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold" style={{ color: colors.dark }}>Dashboard Overview</h1>
            
            <div className="flex items-center space-x-2">
              <Select defaultValue="today">
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button style={{ backgroundColor: colors.primary }}>
                Download Report
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,780.00</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 12.5%</span>
                  <span className="text-gray-400 ml-1">vs last period</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">356</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 8.2%</span>
                  <span className="text-gray-400 ml-1">vs last period</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">New Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <span>↓ 3.8%</span>
                  <span className="text-gray-400 ml-1">vs last period</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.6%</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 1.2%</span>
                  <span className="text-gray-400 ml-1">vs last period</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Daily revenue for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-gray-400">
                  <AreaChart className="h-16 w-16" />
                  <p className="ml-2">Sales chart will render here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-gray-400">
                  <BarChart className="h-16 w-16" />
                  <p className="ml-2">Products chart will render here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your most recent orders</CardDescription>
              </div>
              <Button variant="outline">View All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#OR-2653</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback style={{ backgroundColor: colors.primary, color: "white" }}>JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                      </div>
                    </TableCell>
                    <TableCell>Nike Air Max 90</TableCell>
                    <TableCell>March 7, 2025</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </TableCell>
                    <TableCell className="text-right">$129.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#OR-2652</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback style={{ backgroundColor: colors.secondary, color: "white" }}>AS</AvatarFallback>
                        </Avatar>
                        <span>Alice Smith</span>
                      </div>
                    </TableCell>
                    <TableCell>Adidas Ultraboost</TableCell>
                    <TableCell>March 7, 2025</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Processing
                      </span>
                    </TableCell>
                    <TableCell className="text-right">$189.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#OR-2651</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback style={{ backgroundColor: colors.accent, color: "white" }}>BJ</AvatarFallback>
                        </Avatar>
                        <span>Bob Johnson</span>
                      </div>
                    </TableCell>
                    <TableCell>Puma RS-X</TableCell>
                    <TableCell>March 6, 2025</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </TableCell>
                    <TableCell className="text-right">$104.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#OR-2650</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback style={{ backgroundColor: colors.primary, color: "white" }}>EW</AvatarFallback>
                        </Avatar>
                        <span>Emily Williams</span>
                      </div>
                    </TableCell>
                    <TableCell>New Balance 574</TableCell>
                    <TableCell>March 6, 2025</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    </TableCell>
                    <TableCell className="text-right">$79.99</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      
    </div>
  );
}