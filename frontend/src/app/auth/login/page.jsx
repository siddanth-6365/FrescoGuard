"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpForm() {
  const router = useRouter();
  const [islogin, setIslogin] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  if (islogin) {
    if (localStorage.getItem("userId")) {
      router.push("/dashboard");
    }
  }

  const handleSubmit = async () => {
    console.log("Submitting form data:", formData);
    try {
      const backendUrl = process.env.BACKEND_URL;
      const response = await fetch(`${backendUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful. Received data:", data);

        localStorage.setItem("userId", JSON.stringify(data.user._id));
        setIslogin(true);

      } else {
        console.error("Login failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Login to the account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleSubmit}>
              login
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700">
              need to have an account?{" "}
              <Link href="/auth/signup">
                <span className="text-blue-600 hover:underline">Sign up</span>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
