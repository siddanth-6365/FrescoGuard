"use client";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUpForm() {
  const router = useRouter();
  const [islogin, setIslogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  if (islogin) {
    if (localStorage.getItem("userId")) {
      router.push("/dashboard");
    }
  }

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTypeChange = (selectedType) => {
    handleInputChange("type", selectedType);
  };

  const handleSubmit = async () => {
    try {
      const backendUrl = process.env.BACKEND_URL;
      const response = await fetch(`${backendUrl}/user/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registered successfully:", data.user);
        localStorage.setItem("userId", JSON.stringify(data.user._id));
        setIslogin(true);
      } else {
        const errorData = await response.json();
        console.error("Error registering user:", errorData.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="relative flex bg-black flex-col justify-center items-center min-h-screen overflow-hidden">
       <div className=" font-bold mt-4 text-2xl text-yellow-300"><Link href={"/"}>Home</Link></div>
     
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Type</Label>
              <Select
                onValueChange={(value) => handleTypeChange(value)}
                defaultValue={formData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="producer">Producer</SelectItem>
                  <SelectItem value="retailer">Retailer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleSubmit}>
              Sign Up
            </Button>
            <Link href={"/auth/login"}><p className="mt-2 text-xs text-center text-gray-700">
              Already have an account?{" "}
              <span className=" text-blue-600 hover:underline">Sign In</span>
            </p></Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
