"use client"
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWarehouseContext } from "@/components/contextapi/WarehouseContext";

// Import statements (please include any necessary imports)

const CropInput = () => {
    const { state: warehouseState } = useWarehouseContext();
  const { warehouses } = warehouseState;
  console.log(warehouses)
  
  // Assuming you have a selected warehouse ID in your state
  const selectedWarehouseId = warehouseState.selectedWarehouseId;

  const selectedWarehouse = warehouses.find(warehouse => warehouse.id === selectedWarehouseId);

  const warehouseId = selectedWarehouse?.id || "";
  const warehouseName = selectedWarehouse?.name || "";
  

    const [crops, setCrops] = useState([]);
    const [cropName, setCropName] = useState("Rice");
    const [quantity, setQuantity] = useState("");
    const [editIndex, setEditIndex] = useState(null);
   
    const [availableCrops, setAvailableCrops] = useState(["Rice", "Wheat", "Corn"]);

   

    useEffect(() => {
        // Fetch crops data for the warehouse ID
        const fetchCrops = async () => {
          const apiUrl = `YOUR_API_URL/crops?warehouseId=${warehouseId}`;
    
          try {
            const response = await fetch(apiUrl);
            if (response.ok) {
              const data = await response.json();
              setCrops(data);
            } else {
              console.error('Failed to fetch crops data.');
            }
          } catch (error) {
            console.error('Error fetching crops data:', error);
          }
        };
    
        fetchCrops();
      }, [warehouseId]);
      const handleEditCrop2 = async (index) => {
        const updatedCrops = [...crops];
        const editedCrop = updatedCrops[index];
        editedCrop.name = cropName;
        editedCrop.quantity = quantity;
        
    
        // Make a PUT request to update the edited crop
        const apiUrl = `YOUR_API_URL/crops`;
    
        try {
          const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedCrop),
          });
    
          if (response.ok) {
            setCrops(updatedCrops);
            setEditIndex(null);
            setCropName("");
            setQuantity("");
          } else {
            console.error('Failed to save edited crop.');
          }
        } catch (error) {
          console.error('Error saving edited crop:', error);
        }
      };

      const handleSubmit = async () => {
       
        if (cropName && quantity) {
          const newCrop = {
            name: cropName,
            quantity: quantity,
            warehouseId: warehouseId,
          };
          console.log(cropName);
    
          // Make a POST request to add the new crop
          const apiUrl = 'YOUR_API_URL';
    
          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newCrop),
            });
    
            if (response.ok) {
              setCrops((prevCrops) => [...prevCrops, newCrop]);
              setCropName("");
              setQuantity("");
            } else {
              console.error('Failed to add new crop.');
            }
          } catch (error) {
            console.error('Error adding new crop:', error);
          }
        }
      };
      const handleDeleteCrop2 = async (index) => {
        const deletedCrop = crops[index];
        const options={
            name:deletedCrop.name,
            warehouseId:warehouseId
        }
    
        // Make a DELETE request to remove the crop
        const apiUrl = `YOUR_API_URL/crops/delete`;
    
        try {
          const response = await fetch(apiUrl, {
            method: 'DELETE',
            body: JSON.stringify(options),
          });
    
          if (response.ok) {
            const updatedCrops = [...crops];
            updatedCrops.splice(index, 1);
            setCrops(updatedCrops);
            setEditIndex(null);
            setCropName("");
            setQuantity("");
          } else {
            console.error('Failed to delete crop.');
          }
        } catch (error) {
          console.error('Error deleting crop:', error);
        }
      };
  
      const handleAddCrop = () => {
        if (cropName && quantity) {
          const newCrop = {
            name: cropName,
            quantity: quantity,
          };
         
          // Update the available crops after adding a new crop
          setAvailableCrops((prevAvailableCrops) =>
            prevAvailableCrops.filter((crop) => crop !== cropName)
          );
      
          // Add the new crop to the state
          setCrops((prevCrops) => [...prevCrops, newCrop]);
      
          // Reset the input fields
          setCropName(""); // Set the default value to "Rice"
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
        const deletedCrop = crops[index];
      const updatedCrops = [...crops];
      setAvailableCrops((prevAvailableCrops) => [...prevAvailableCrops, deletedCrop.name]);

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
         <div className="flex flex-col bg-black  gap-4 justify-center h-screen items-center">
         <h1 className=" text-white text-4xl mb-4 ">Add Your Crops</h1>
  <div className="flex flex-row justify-around items-center ">
    {availableCrops.length > 0 && (
      <Card style={{ width: "300px" }}>
        <CardHeader>
          <CardTitle>Add Crop</CardTitle>
          <CardDescription>Enter crop details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <label className="flex flex-row gap-4 items-center justify-center">
              <p>Warehouse Name: {warehouseName}</p>
            </label>
            <label className="flex flex-row gap-4 items-center justify-center">
              <p>Crop Name</p>
              <select
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              >
                {availableCrops.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
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
                onClick={handleSubmit}
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
    )}

    {/* Existing Cards */}
    <div className="flex flex-col gap-4">
       
      {
        crops.length?(
            crops.map((crop, index) => (
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
                        <CardTitle>Crop Name: {crop.name}</CardTitle>
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
              ))
        ):(
            <>
            
            </>
        )
      }
    </div>
  </div>
</div>

      </>
    );
  };
  
  export default CropInput;
  