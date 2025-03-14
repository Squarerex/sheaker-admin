"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Building,
  Truck,
  CreditCard,
  Shield,
  Bell,
  Upload,
  Lock,
  Mail,
  Smartphone,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Brand colors
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F",
};

// Animation variants
const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Form schemas
const accountSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type AccountFormData = z.infer<typeof accountSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Account form
  const accountForm = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@dropship.com",
      phone: "+1 (555) 123-4567",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSave = async (data: AccountFormData | PasswordFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saved data:", data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6" style={{ color: colors.dark }}>
          Settings
        </h1>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 rounded-lg p-1 flex flex-wrap gap-2">
            <TabsTrigger
              value="account"
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <User className="w-4 h-4" />
              Account
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <Truck className="w-4 h-4" />
              Shipping
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" asChild>
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account profile information and email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" alt="Admin" />
                      <AvatarFallback style={{ backgroundColor: colors.secondary, color: "white" }}>
                        AD
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Change Avatar
                    </Button>
                  </div>
                  <form onSubmit={accountForm.handleSubmit(handleSave)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input {...accountForm.register("firstName")} />
                        {accountForm.formState.errors.firstName && (
                          <p className="text-sm text-red-500">{accountForm.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input {...accountForm.register("lastName")} />
                        {accountForm.formState.errors.lastName && (
                          <p className="text-sm text-red-500">{accountForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input {...accountForm.register("email")} />
                        {accountForm.formState.errors.email && (
                          <p className="text-sm text-red-500">{accountForm.formState.errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input {...accountForm.register("phone")} />
                      </div>
                    </div>
                    <CardFooter className="flex justify-end gap-2 p-0">
                      <Button variant="outline" type="button" onClick={() => accountForm.reset()}>
                        Cancel
                      </Button>
                      <Button type="submit" style={{ backgroundColor: colors.primary }} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={passwordForm.handleSubmit(handleSave)} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <Input type="password" {...passwordForm.register("currentPassword")} />
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <Input type="password" {...passwordForm.register("newPassword")} />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
                      )}
                      <p className="text-sm text-gray-500">
                        Password must be at least 8 characters and include uppercase, lowercase, numbers, and special
                        characters.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <Input type="password" {...passwordForm.register("confirmPassword")} />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                    <CardFooter className="flex justify-end gap-2 p-0">
                      <Button variant="outline" type="button" onClick={() => passwordForm.reset()}>
                        Cancel
                      </Button>
                      <Button type="submit" style={{ backgroundColor: colors.primary }} disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping" asChild>
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Methods</CardTitle>
                  <CardDescription>Configure your available shipping options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Standard Shipping", desc: "5-7 business days", price: "$5.99", checked: true },
                    { name: "Express Shipping", desc: "2-3 business days", price: "$12.99", checked: true },
                    { name: "Next Day Delivery", desc: "1 business day", price: "$24.99", checked: false },
                    { name: "Free Shipping", desc: "On orders over $100", price: "$0.00", checked: true },
                  ].map((method) => (
                    <div key={method.name} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="space-y-1">
                        <h3 className="font-medium">{method.name}</h3>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">{method.price}</p>
                        <Switch defaultChecked={method.checked} id={method.name.toLowerCase().replace(" ", "-")} />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="mt-4">
                    Add New Shipping Method
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button style={{ backgroundColor: colors.primary }}  disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Payment Settings */}
          {/* <TabsContent value="payment" asChild>
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Configure your store&apos;s payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Credit / Debit Cards", desc: "Visa, Mastercard, Amex", color: "bg-blue-500", checked: true },
                    { name: "PayPal", desc: "paypal@dropship.com", color: "bg-blue-700", checked: true },
                    { name: "Stripe", desc: "Connected", color: "bg-purple-600", checked: true },
                    { name: "Apple Pay", desc: "Not connected", color: "bg-orange-500", checked: false },
                  ].map((method) => (
                    <div key={method.name} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${method.color} rounded-md flex items-center justify-center text-white`}>
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{method.name}</h3>
                          <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                      </div>
                      <Switch defaultChecked={method.checked} id={method.name.toLowerCase().replace(" / ", "-").replace(" ", "-")} />
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button style={{ backgroundColor: colors.primary }}  disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent> */}

          {/* Security Settings */}
          <TabsContent value="security" asChild>
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card>
                <CardHeader>
                  <CardTitle>Login Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security with 2FA</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <h3 className="font-medium">Email Authentication</h3>
                        <p className="text-sm text-gray-500">Receive a code via email</p>
                      </div>
                      <Switch id="email-2fa" className="ml-auto" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <h3 className="font-medium">Session Timeout</h3>
                      <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Timeout Duration</label>
                    <Input type="number" defaultValue="30" min="5" max="120" className="w-24" />
                    <p className="text-sm text-gray-500">Minutes (5-120)</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button style={{ backgroundColor: colors.primary }}  disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Settings */}
          {/* <TabsContent value="notifications" asChild>
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-1">
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-1">
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-500">Receive updates on your device</p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-1">
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-500">Receive updates via text message</p>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Types</h3>
                    {[
                      { name: "Order Updates", desc: "New orders, shipments, etc.", checked: true },
                      { name: "Security Alerts", desc: "Login attempts, password changes", checked: true },
                      { name: "Store Performance", desc: "Sales reports, analytics", checked: false },
                    ].map((type) => (
                      <div key={type.name} className="flex items-center justify-between py-2">
                        <div className="space-y-1">
                          <h4 className="font-medium">{type.name}</h4>
                          <p className="text-sm text-gray-500">{type.desc}</p>
                        </div>
                        <Switch id={type.name.toLowerCase().replace(" ", "-")} defaultChecked={type.checked} />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button style={{ backgroundColor: colors.primary }}  disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent> */}
        </Tabs>
      </motion.div>
    </div>
  );
}