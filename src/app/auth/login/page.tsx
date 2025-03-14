"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import companyLogo from "../../../../public/companyLogo.png";

// Brand colors
const colors = {
  primary: "#0836C1",
  secondary: "#FB7E11",
  accent: "#4D0A51",
  dark: "#1F1F1F",
};

// Form schema with validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const inputVariants = {
  focus: { scale: 1.02, borderColor: colors.secondary, transition: { duration: 0.2 } },
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false); // State to toggle OTP form
  const [email, setEmail] = useState(""); // Store email for OTP verification

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate API call for login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.email === "aboyejiemmanuel07@gmail.com" && data.password === "admin123") {
      toast.success("Login successful!", {
        description: "Please enter the OTP sent to your email.",
      });
      setEmail(data.email); // Store email for OTP verification
      setShowOtpForm(true); // Show OTP form
    } else {
      toast.error("Login failed", {
        description: "Invalid email or password.",
      });
    }
    setIsLoading(false);
  };

  const handleOtpVerification = async (data: OtpFormData) => {
    setIsLoading(true);

    // Simulate OTP verification API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.otp === "123456") {
      toast.success("OTP verified!", {
        description: "Redirecting to dashboard...",
      });
      router.push("/");
    } else {
      toast.error("OTP verification failed", {
        description: "Invalid OTP. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Left Section - Branding/Visuals */}
        <div className="hidden lg:flex flex-col justify-center items-center p-8 bg-gradient-to-br from-[#0836C1] to-[#4D0A51] rounded-xl shadow-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center"
          >
            <Image
              src={companyLogo}
              alt="Sheaker Logo"
              width={120}
              height={120}
              className="object-cover mb-6"
            />
            <h1 className="text-4xl font-extrabold text-white mb-4">Welcome Back, Admin</h1>
            <p className="text-lg text-gray-200">
              Access your dashboard and take control of your store with ease.
            </p>
          </motion.div>
        </div>

        {/* Right Section - Login Form or OTP Form */}
        <div className="flex flex-col justify-center items-center p-8">
          <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="text-center py-8 border-b border-gray-200">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="mb-4"
              >
                <Image
                  src={companyLogo}
                  alt="Sheaker Logo"
                  width={64}
                  height={64}
                  className="object-cover mx-auto"
                />
              </motion.div>
              <CardTitle className="text-3xl font-extrabold" style={{ color: colors.dark }}>
                {showOtpForm ? "Verify OTP" : "Admin Login"}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                {showOtpForm
                  ? `Enter the 6-digit OTP sent to ${email}`
                  : "Sign in to manage your dashboard"}
              </p>
            </CardHeader>
            <CardContent className="p-8">
              {showOtpForm ? (
                // OTP Form
                <form onSubmit={handleOtpSubmit(handleOtpVerification)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium" style={{ color: colors.dark }}>
                      OTP
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <Input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        {...otpRegister("otp")}
                        placeholder="123456"
                        className={cn(
                          "border-gray-300 focus:ring-2 focus:ring-[#FB7E11] focus:border-transparent",
                          otpErrors.otp && "border-red-500"
                        )}
                      />
                    </motion.div>
                    {otpErrors.otp && (
                      <p className="text-sm text-red-500">{otpErrors.otp.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#FB7E11] hover:bg-[#FB7E11]/90 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                </form>
              ) : (
                // Login Form
                <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium" style={{ color: colors.dark }}>
                      Email
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <Input
                        id="email"
                        type="email"
                        {...loginRegister("email")}
                        placeholder="aboyejiemmanuel07@gmail.com"
                        className={cn(
                          "border-gray-300 focus:ring-2 focus:ring-[#FB7E11] focus:border-transparent",
                          loginErrors.email && "border-red-500"
                        )}
                      />
                    </motion.div>
                    {loginErrors.email && (
                      <p className="text-sm text-red-500">{loginErrors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium" style={{ color: colors.dark }}>
                      Password
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus" className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...loginRegister("password")}
                        placeholder="••••••••"
                        className={cn(
                          "border-gray-300 focus:ring-2 focus:ring-[#FB7E11] focus:border-transparent pr-10",
                          loginErrors.password && "border-red-500"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#FB7E11]"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </motion.div>
                    {loginErrors.password && (
                      <p className="text-sm text-red-500">{loginErrors.password.message}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-sm text-[#FB7E11] hover:text-[#FB7E11] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Forgot Password", { description: "This feature is not implemented yet." });
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#FB7E11] hover:bg-[#FB7E11]/90 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            <div className="text-center py-4 text-sm text-gray-500 bg-gray-50">
              © 2025 Sheaker. All rights reserved.
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}