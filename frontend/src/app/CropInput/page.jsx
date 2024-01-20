"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import statements (please include any necessary imports)

const CropInput = () => {
    const [crops, setCrops] = useState([]);
    const [cropName, setCropName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [editIndex, setEditIndex] = useState(null);
  
    const handleAddCrop = () => {
      if (cropName && quantity) {
        const newCrop = {
          name: cropName,
          quantity: quantity,
        };
  
        setCrops((prevCrops) => [...prevCrops, newCrop]);
        setCropName("");
        setQuantity("");
      }
    };
  
    const handleEditCrop = (index) => {
      setEditIndex(index);
      setCropName(crops[index].name);
      setQuantity(crops[index].quantity);
    };
  
    const handleSaveCrop = (index) => {
      const updatedCrops = [...crops];
      updatedCrops[index].name = cropName;
      updatedCrops[index].quantity = quantity;
      setCrops(updatedCrops);
      setEditIndex(null);
      setCropName("");
      setQuantity("");
    };
  
    const handleDeleteCrop = (index) => {
      const updatedCrops = [...crops];
      updatedCrops.splice(index, 1);
      setCrops(updatedCrops);
      setEditIndex(null);
      setCropName("");
      setQuantity("");
    };
  
    const handleIncreaseQuantity = () => {
      setQuantity((prevQuantity) => String(Number(prevQuantity) + 1));
    };
  
    const handleDecreaseQuantity = () => {
      if (Number(quantity) > 0) {
        setQuantity((prevQuantity) => String(Number(prevQuantity) - 1));
      }
    };
  
    return (
      <>
        <div className="flex flex-col gap-4 justify-center h-screen items-center">
          <div className="flex flex-row justify-around items-center gap-[100px] ">
            {/* Adding Card with fixed width */}
            <Card style={{ width: "300px" }}>
              <CardHeader>
                <CardTitle>Add Crop</CardTitle>
                <CardDescription>Enter crop details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-row gap-4 items-center justify-center">
                    <p>Crop Name</p>
                    <input
                      type="text"
                      value={cropName}
                      onChange={(e) => setCropName(e.target.value)}
                      placeholder="Enter crop name"
                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                  </label>
                  <label className="flex flex-row gap-4 items-center justify-center">
                    <p>Quantity</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDecreaseQuantity}
                        className="font-semibold bg-red-500 text-white p-2 rounded-md"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                      <button
                        type="button"
                        onClick={handleIncreaseQuantity}
                        className="font-semibold bg-green-500 text-white p-2 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </label>
                  {editIndex === null ? (
                    <button
                      type="button"
                      onClick={handleAddCrop}
                      className="font-semibold bg-green-500 text-white p-2 rounded-md"
                    >
                      Add Crop
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSaveCrop(editIndex)}
                      className="font-semibold bg-blue-500 text-white p-2 rounded-md"
                    >
                      Save Crop
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
  
            {/* Existing Cards */}
            <div className="flex flex-col gap-4">
              {crops.map((crop, index) => (
                <Card key={index} className="flex-1 max-w-[400px]">
                  <CardHeader>
                    {editIndex === index ? (
                      <>
                        <CardTitle>
                          <input
                            type="text"
                            value={cropName}
                            onChange={(e) => setCropName(e.target.value)}
                            placeholder="Enter crop name"
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                          />
                        </CardTitle>
                        <CardDescription>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={handleDecreaseQuantity}
                              className="font-semibold bg-red-500 text-white p-2 rounded-md"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              placeholder="Enter quantity"
                              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />
                            <button
                              type="button"
                              onClick={handleIncreaseQuantity}
                              className="font-semibold bg-green-500 text-white p-2 rounded-md"
                            >
                              +
                            </button>
                          </div>
                        </CardDescription>
                      </>
                    ) : (
                      <>
                        <CardTitle>{crop.name}</CardTitle>
                        <CardDescription>Quantity: {crop.quantity}</CardDescription>
                      </>
                    )}
                  </CardHeader>
                  <CardFooter>
                    <div className="flex justify-end gap-2">
                      {editIndex === index ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleSaveCrop(index)}
                            className="font-semibold bg-blue-500 text-white p-2 rounded-md"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditIndex(null)}
                            className="font-semibold bg-gray-500 text-white p-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEditCrop(index)}
                            className="font-semibold bg-yellow-500 text-white p-2 rounded-md"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCrop(index)}
                            className="font-semibold bg-red-500 text-white p-2 rounded-md"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CropInput;
  