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
import { useToast } from "@/components/ui/use-toast"

// Import statements (please include any necessary imports)

const CropInput = () => {
  
  
    const { toast } = useToast();
    const [crops, setCrops] = useState([]);
    const [cropName, setCropName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [availableCrops, setAvailableCrops] = useState(["Rice", "Wheat", "Corn"]);
    const [availableWarehouse, setAvailableWarehouse] = useState([]);
    const [sunlight, setSunlight] = useState("fullSun");
    const [pesticide, setPesticide] = useState("organic");
    const [moisture, setMoisture] = useState("");
    const [temperature, setTemperature] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [warehouseId, setWarehouseId] = useState("");
    
    

    useEffect(() => {
        const getWarehouse = async () => {
            const backendUrl = process.env.BACKEND_URL;
            let userId = localStorage.getItem("userId");
    
            if (userId && typeof userId === 'string') {
              userId = userId.replace(/^"(.*)"$/, '$1');         
            }
            console.log(userId);
            const apiUrl = `${backendUrl}/warehouse/getallwarehouses/${userId}`;
      
            try {
              const response = await fetch(apiUrl);
              if (response.ok) {
                const data = await response.json();
                setAvailableWarehouse(data);
                console.log(data);
              } else {
                console.error('Failed to fetch crops data.');
              }
            } catch (error) {
              console.error('Error fetching crops data:', error);
            }
          }
          getWarehouse();        
    }, []);


    const handleSubmit = async (e) => {
      e.preventDefault();
      if (cropName && quantity) {
        const newCrop = {
          name: cropName,
          quantity: quantity,
          sunlight: sunlight,
          pesticide: pesticide,
          moisture: moisture,
          warehouseID: warehouseId,
        };
        console.log(newCrop);
        
        const backendUrl = process.env.BACKEND_URL;
        let userId = localStorage.getItem("userId");

        if (userId && typeof userId === 'string') {
          userId = userId.replace(/^"(.*)"$/, '$1');         
        }
        // Make a POST request to add the new crop
        const apiUrl = `${backendUrl}/product/createproduct`;
  
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCrop),
          });
          
 
          if (response.ok) {
            toast({
              title: "",
              description: "crop is added",
            });
            // setCrops((prevCrops) => [...prevCrops, newCrop]);
            // setCropName("");
            // setQuantity("");
            // setSunlight("0");
            // setPesticide("0");
            // setMoisture("");
            // setTemperature("");
          } else {
            console.error('Failed to add new crop.');
          }
        } catch (error) {
          console.error('Error adding new crop:', error);
        }
      }
    };

  
    return (
      <>
       <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-96 p-6 border border-gray-300 shadow-md bg-white rounded-md">
        <CardHeader className="border-b pb-2 mb-4">
          <CardTitle className="text-lg font-semibold text-gray-800">Crop Input Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="warehouse" className="mb-1 text-sm font-medium text-gray-700">
                Warehouses:
              </label>
              <select
                id="warehouse"
             
                value={warehouseId}
                onChange={(e) => setWarehouseId(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Warehouse
                </option>
                {availableWarehouse.map((warehouse,index) => (
                  <option key={index} value={warehouse._id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="cropName" className="mb-1 text-sm font-medium text-gray-700">
                Crop Name:
              </label>
              <input
                type="text"
                id="cropName"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="quantity" className="mb-1 text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Sunlight:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="2"
                    checked={sunlight === "2"}
                    onChange={() => setSunlight("2")}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">High</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="1"
                    checked={sunlight === "1"}
                    onChange={() => setSunlight("1")}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">Medium</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="0"
                    checked={sunlight === "0"}
                    onChange={() => setSunlight("0")}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">Low</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Pesticide:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="1"
                    checked={pesticide === "1"}
                    onChange={() => setPesticide("1")}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="0"
                    checked={pesticide === "0"}
                    onChange={() => setPesticide("0")}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>  

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"

            >
              Add Crop
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
      </>
    );
  };
  
  export default CropInput;
  