"use client"
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WarehouseInput = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    moisture: "",
    oxygen: "",
    sunlight: "",
    pesticides: "",
    temperature: "",
  });
  const { toast } = useToast();
  const handleNavigate=(e)=>{
    if (validateForm()) {
        
        
        // Print form data in console
        console.log(formData);
  
        // Navigate to the next page
        // Replace the Link component with the actual navigation logic you are using
        // For example, if you are using the next/router, you can use router.push("/CropInput")
      } else {
        e.preventDefault();
        console.log("Please fill in all required fields.");
        toast({
            title: "",
            description: "Please fill in all required fields.",
          })
      }
  }
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (validateForm()) {
      // Print form data in console
      console.log(formData);

      // Navigate to the next page
      // Replace the Link component with the actual navigation logic you are using
      // For example, if you are using the next/router, you can use router.push("/CropInput")
    } else {
      console.log("Please fill in all required fields.");
    }
  };

  const validateForm = () => {
    // Add your form validation logic here
    // For example, check if all required fields are filled
    return (
      formData.name &&
      formData.location &&
      formData.moisture &&
      formData.oxygen &&
      formData.sunlight &&
      formData.pesticides !== "" &&
      formData.temperature
    );
  };

  const {
    name,
    location,
    moisture,
    oxygen,
    sunlight,
    pesticides,
    temperature,
  } = formData;

  return (
    <>
      <div className="flex flex-col gap-4 justify-center h-screen items-center">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div>Enter Your Warehouse Details</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <form
                  className="flex flex-col flex-wrap gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="flex flex-row gap-4 items-center justify-center">
                      <p className="">Name</p>
                      <input
                        required
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                        placeholder="Enter your Warehouse Name"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-row gap-4 items-center justify-center">
                      <p className="">Location</p>
                      <input
                        required
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleOnChange}
                        placeholder="Enter Warehouse Location"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-row gap-4 items-center justify-center">
                      <p className="">Moisture</p>
                      <input
                        required
                        type="text"
                        name="moisture"
                        value={moisture}
                        onChange={handleOnChange}
                        placeholder="Moisture Content"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-row gap-4 items-center justify-center">
                      <p className="">Oxygen</p>
                      <input
                        required
                        type="text"
                        name="oxygen"
                        value={oxygen}
                        onChange={handleOnChange}
                        placeholder="Oxygen"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-row gap-4 items-center justify-center">
                      <p className="">Sunlight</p>
                      <input
                        required
                        type="text"
                        name="sunlight"
                        value={sunlight}
                        onChange={handleOnChange}
                        placeholder="Sunlight"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-row gap-4 items-center">
                      <p className="">Pesticide</p>
                      <input
                        required
                        type="radio"
                        name="pesticides"
                        value={"yes"}
                        onChange={handleOnChange}
                      />
                      <p className="">Yes</p>
                      <input
                        required
                        type="radio"
                        name="pesticides"
                        value={"no"}
                        onChange={handleOnChange}
                      />
                      <p className="">No</p>
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-row gap-4 items-center justify-center">
                      <p className="">Temperature</p>
                      <input
                        required
                        type="text"
                        name="temperature"
                        value={temperature}
                        onChange={handleOnChange}
                        placeholder="Temperature"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                    </label>
                  </div>
                 
                  <Link onClick={handleNavigate}  href={"/CropInput"}>
                  <Button type="submit" variant="outline">
                    Next
                    </Button>
                  </Link>
                </form>
              </div>
            </CardContent>
            <CardFooter>
              {/* Replace the Link component with your navigation logic */}
              
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default WarehouseInput;
