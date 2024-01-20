"use client"
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { FaChevronLeft } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWarehouseContext } from "@/components/contextapi/WarehouseContext";
import { number } from "zod";

const WarehouseInput = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",

  });
  const { state, dispatch } = useWarehouseContext();
  const { toast } = useToast();
//   const handleNavigate= async (e)=>{
//     if (validateForm()) {
//         try {
//             dispatch({ type: "ADD_WAREHOUSE", payload: formData });

//             const response = await fetch("http://localhost:5000/warehouse/createwarehouse", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(formData),
//             });
      
//             if (response.ok) {
//               const data = await response.json();
//               console.log("Login successful. Received data:", data);
//             } else {
//               console.error("Login failed. Status:", response.status);
//             }
//           } catch (error) {
//             console.error("Error during login:", error);
//           }
        
//         dispatch({ type: "ADD_WAREHOUSE", payload: formData });
//         console.log(formData);
       
//       } else {
//         e.preventDefault();
//         console.log("Please fill in all required fields.");
//         toast({
//             title: "",
//             description: "Please fill in all required fields.",
//           })
//       }
//   }
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const  handleSubmit  = async (e) => {
   

    if (validateForm()) {
      try {
        dispatch({ type: "ADD_WAREHOUSE", payload: formData });
        const backendUrl = process.env.BACKEND_URL;
        let userId = localStorage.getItem("userId");

        if (userId && typeof userId === 'string') {
          userId = userId.replace(/^"(.*)"$/, '$1');         
        }
        formData["userId"] = userId;

        const response = await fetch(`${backendUrl}/warehouse/createwarehouse`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          withCredentials: true,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Warehouse creation successful. Received data:", data);

          router.push('/dashboard');
        } else {
          console.error("Warehouse creation failed. Status:", response.status);
        }
      } catch (error) {
        console.error("Error during warehouse creation:", error);
      }
    } else {
        e.preventDefault();
      console.log("Please fill in all required fields.");
      toast({
        title: "",
        description: "Please fill in all required fields.",
      });
    }
  };

  const validateForm = () => {
    // Add your form validation logic here
    // For example, check if all required fields are filled
    if(!formData.name &&
        !formData.location &&
        !formData.capacity ){
            return false;
        }
        else{
            return true;
        }
      
     
    
  };

  const {
    name,
    location,  
    capacity,
  } = formData;

  return (
    <>
      <div className="flex bg-black flex-col gap-4 justify-center h-screen items-center">
        <Link className=" text-xl text-yellow-300 p-2 rounded-lg " href={"/dashboard"}><div className=" flex justify-center items-center gap-2"><FaChevronLeft /><p>Go Back To Dashboard</p></div></Link>
        <h1 className=" text-white text-4xl mb-4 ">Build YOUR Warehouse</h1>
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
                  
                  
                  {/* <div>
                    <label className="flex flex-row gap-4 items-center ">
                      <p className="">Sunlight</p>
                      <input
                        required
                        type="radio"
                        name="Sunlight"
                        value={"High"}
                        onChange={handleOnChange}
                      />
                      <p className="">High</p>
                      <input
                        required
                        type="radio"
                        name="Sunlight"
                        value={"Medium"}
                        onChange={handleOnChange}
                      />
                      <p className="">Medium</p>
                      <input
                        required
                        type="radio"
                        name="Sunlight"
                        value={"Low"}
                        onChange={handleOnChange}
                      />
                      <p className="">Low</p>
                    </label>
                  </div> */}
                  <div>
                    <label className="flex flex-row gap-4 items-center">
                      <p className="">Capacity</p>

                      <input
                        required
                        type="number"
                        name="capacity"
                        value={capacity}
                        onChange={handleOnChange}
                        placeholder="Enter Warehouse Capacity"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                      {/* <p className="">No</p> */}
                    </label>
                  </div>
                 
                 
                  <Link onClick={handleSubmit}  href={"/CropInput"}>
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
