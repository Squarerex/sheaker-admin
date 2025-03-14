"use client"
import React, { useState } from 'react';
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
  Bell,
  AreaChart as AreaChartIcon, 
  BarChart as BarChartIcon,
  Users,
  UserCheck,
  TrendingUp,
  Package,
  ShoppingCart,
  AlertTriangle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Custom theme colors 
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444"
}

export default function Dashboard() {
  const [period, setPeriod] = useState("month");
  
  // Sales data
  const salesData = [
    { name: 'Mar 1', revenue: 1200, orders: 12, profit: 420 },
    { name: 'Mar 2', revenue: 1900, orders: 18, profit: 680 },
    { name: 'Mar 3', revenue: 800, orders: 8, profit: 290 },
    { name: 'Mar 4', revenue: 1600, orders: 15, profit: 540 },
    { name: 'Mar 5', revenue: 2400, orders: 22, profit: 860 },
    { name: 'Mar 6', revenue: 1800, orders: 17, profit: 630 },
    { name: 'Mar 7', revenue: 2800, orders: 25, profit: 980 },
    { name: 'Mar 8', revenue: 2200, orders: 20, profit: 760 },
    { name: 'Mar 9', revenue: 2600, orders: 24, profit: 920 },
    { name: 'Mar 10', revenue: 1500, orders: 14, profit: 520 },
    { name: 'Mar 11', revenue: 1900, orders: 18, profit: 680 },
    { name: 'Mar 12', revenue: 2100, orders: 19, profit: 740 },
    { name: 'Mar 13', revenue: 2500, orders: 23, profit: 890 },
  ];
  
  // Product data
  const productData = [
    { name: 'Nike Air Max', sales: 42, stock: 18, value: 5460 },
    { name: 'Adidas Ultra', sales: 38, stock: 5, value: 7220 },
    { name: 'Puma RS-X', sales: 31, stock: 22, value: 3255 },
    { name: 'NB 574', sales: 25, stock: 14, value: 2000 },
    { name: 'Converse All', sales: 22, stock: 9, value: 1760 },
  ];
  
  // Customer data
  const customerData = [
    { name: 'New', value: 42 },
    { name: 'Returning', value: 58 },
  ];
  
  const CUSTOMER_COLORS = [colors.primary, colors.secondary];
  
  // Traffic data
  const trafficData = [
    { name: 'Direct', visits: 1200, bounceRate: 42 },
    { name: 'Organic', visits: 800, bounceRate: 35 },
    { name: 'Social', visits: 1600, bounceRate: 48 },
    { name: 'Referral', visits: 400, bounceRate: 25 },
    { name: 'Email', visits: 600, bounceRate: 30 },
  ];
  
  // Real-time orders
  const realtimeOrders = [
    { id: '#OR-2653', customer: 'John Doe', initials: 'JD', product: 'Nike Air Max 90', date: '2 mins ago', status: 'Completed', amount: '$129.99', bgColor: colors.primary },
    { id: '#OR-2652', customer: 'Alice Smith', initials: 'AS', product: 'Adidas Ultraboost', date: '15 mins ago', status: 'Processing', amount: '$189.99', bgColor: colors.secondary },
    { id: '#OR-2651', customer: 'Bob Johnson', initials: 'BJ', product: 'Puma RS-X', date: '32 mins ago', status: 'Completed', amount: '$104.99', bgColor: colors.accent },
    { id: '#OR-2650', customer: 'Emily Williams', initials: 'EW', product: 'New Balance 574', date: '58 mins ago', status: 'Cancelled', amount: '$79.99', bgColor: colors.primary },
  ];
  
  // Low stock alerts
  const lowStockItems = [
    { product: 'Adidas Ultraboost', stock: 5, threshold: 10 },
    { product: 'Converse All Star', stock: 9, threshold: 15 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">          
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold" style={{ color: colors.dark }}>Dashboard Overview</h1>
            
            <div className="flex items-center space-x-2">
              <Select 
                defaultValue="month" 
                onValueChange={(value) => setPeriod(value)}
              >
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
          
          {/* Stats Cards - Sales Performance */}
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
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,673.40</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 6.8%</span>
                  <span className="text-gray-400 ml-1">vs last period</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Low Stock Alerts */}
          {lowStockItems.length > 0 && (
            <div className="mb-6">
              <Alert variant="destructive" className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <AlertTitle className="text-amber-800">Low Stock Alert</AlertTitle>
                <AlertDescription className="text-amber-700">
                  {lowStockItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.product}</span> 
                      <span className="font-semibold">{item.stock} items left</span>
                    </div>
                  ))}
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          {/* Main Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales Overview Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Daily revenue for the past 13 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke={colors.primary}
                        fill={colors.primary}
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stackId="2"
                        stroke={colors.success}
                        fill={colors.success}
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Products Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill={colors.secondary} name="Units Sold" />
                      <Bar dataKey="stock" fill={colors.primary} name="Current Stock" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Customer Engagement & Traffic Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Customer Engagement */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Customer Engagement</CardTitle>
                  <CardDescription>New vs. Returning Customers</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-xl font-bold">100</span>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CUSTOMER_COLORS[index % CUSTOMER_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Users className="h-5 w-5" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">New Customers</div>
                      <div className="text-xl font-bold">42</div>
                    </div>
                    <div className="ml-auto text-xs text-green-500">↑ 12%</div>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="p-2 rounded-full bg-orange-100">
                      <UserCheck className="h-5 w-5" style={{ color: colors.secondary }} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Returning</div>
                      <div className="text-xl font-bold">58</div>
                    </div>
                    <div className="ml-auto text-xs text-green-500">↑ 4%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Website Traffic Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
                <CardDescription>Sessions, Bounce Rate & Source Tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trafficData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="visits"
                        stroke={colors.primary}
                        name="Visits"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="bounceRate"
                        stroke={colors.accent}
                        name="Bounce Rate %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-gray-500">Total Sessions</div>
                    <div className="text-xl font-bold">4,600</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-gray-500">Avg. Bounce Rate</div>
                    <div className="text-xl font-bold">36%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Real-time Order Tracking */}
          {/* <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Real-time Order Tracking</CardTitle>
                <CardDescription>Live order activities</CardDescription>
              </div>
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  4
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realtimeOrders.map((order, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback style={{ backgroundColor: order.bgColor, color: "white" }}>
                        {order.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium">{order.customer}</span>
                        <span className="text-sm text-gray-500">{order.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{order.product}</span>
                        <span className="font-medium">{order.amount}</span>
                      </div>
                    </div>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
          
          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
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
                    <TableCell>Adidas Ultraboost </TableCell>
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