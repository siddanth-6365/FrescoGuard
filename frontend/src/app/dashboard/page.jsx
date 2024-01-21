"use client";
import { useState, useEffect } from "react";
import Card from "../../components/ui/dashboard/card/card";
import Chart from "../../components/ui/dashboard/chart/chart";
import styles from "../../components/ui/dashboard/dashboard.module.css";
import Rightbar from "../../components/ui/dashboard/rightbar/rightbar";
import {PercentageDonutChart,  PercentageDonut2Chart } from "../../components/ui/dashboard/donut/index";
import Select from "react-select";
import { cards } from "./dummyData";

const chartsData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const getWarehousesItems = (warehouse) => {
  const uniqueValues = [...new Set(warehouse)];
  return uniqueValues.map((item) => ({
    value: item.name,
    label: item.name,
  }));
};





const Dashboard = () => {

const [CropItems,setCropItems]=useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState();
  const [availableWarehouse, setAvailableWarehouse] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [data, setData] = useState([]);
  const [dynamicCards, setDynamicCards] = useState([]);
  const [dynamicChart, setDynamicChart] = useState(chartsData);
  const [modelPrediction, setModelPrediction] = useState({
    spoilage: 0,
    life: 0,
  });

  const [crops, setCrops] = useState([]);

  const handleWarehouseChange = (warehouse) => {
    setSelectedWarehouse(warehouse.value);
  };

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  useEffect(() => {
    const getWarehouse = async () => {
      const backendUrl = process.env.BACKEND_URL;
      let userId = localStorage.getItem("userId");

      if (userId && typeof userId === "string") {
        userId = userId.replace(/^"(.*)"$/, "$1");
      }
      console.log(userId);
      const apiUrl = `${backendUrl}/warehouse/getallwarehouses/${userId}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const dataa = await response.json();
          setData(dataa);
          const warehouses = getWarehousesItems(dataa);
          setAvailableWarehouse(warehouses);
        } else {
          console.error("Failed to fetch crops data.");
        }
      } catch (error) {
        console.error("Error fetching crops data:", error);
      }
    };
    getWarehouse();
  }, []);

  function generateRandomValues(min, max) {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomValue;
  }

  useEffect(() => {
    const warehouse = data.filter((warehouse) => {
      if (warehouse.name === selectedWarehouse) return warehouse;
    });
    const warehouseId = warehouse[0] ? warehouse[0]._id : undefined;
    console.log("warehouse :", warehouse);
    console.log("warehouseId :", warehouseId);
    const getcrop = selectedCrop;
    let userId = localStorage.getItem("userId");
    const backendUrl = process.env.BACKEND_URL;
    if (userId && typeof userId === "string") {
      userId = userId.replace(/^"(.*)"$/, "$1");
    }
    let pesticide;
    let sunlight;
    const apiUrl = `${backendUrl}/product/getproduct/${warehouseId}/${getcrop}`;
    const getWarehouse = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          pesticide = data.pesticide;
          sunlight = data.sunlight;
          console.log("pesticide :", pesticide);
          console.log("sunlight :", sunlight);
          const temperature = generateRandomValues(20, 30);
          const moisture = generateRandomValues(20, 30);
          const oxygen = generateRandomValues(0, 7);

          const dynamicCards = [
            {
              title: "Temperature",
              number: temperature,
              change: 5,
            },
            {
              title: "Humidity",
              number: moisture,
              change: 20,
            },
            {
              title: "Oxygen",
              number: oxygen,
              change: -10,
            },
          ];
          setDynamicCards(dynamicCards);

          let crop = selectedCrop;

          if (selectedCrop === "Wheat") {
            crop = "0";
          }
          if (selectedCrop === "Rice") {
            crop = "1";
          }
          if (selectedCrop === "Corn") {
            crop = "2";
          }
          const cropData = {
            crop: crop,
            temperature: temperature,
            moisture: moisture,
            pesticide: pesticide,
            light: sunlight,
            oxygen: oxygen,
          };

          console.log("cropData :", cropData);
          const apiUrl2 = `${backendUrl}/dashboard/ml`;
          const response2 = await fetch(apiUrl2, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cropData),
          });

          if (response2.ok) {
            const data2 = await response2.json();
            console.log("data2 :", data2);
            setModelPrediction(data2);
          }
        }
      } catch (error) {
        console.error("Error fetching crops data:", error);
      }
    };
    const getProductsByWarehouse = async () => {
      try {
        const apiUrl = `${backendUrl}/product/getallproducts/${warehouseId}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
         setCropItems(data);
         console.log("ALL Crops Present");
          console.log(data);
        } else {
          console.error('Failed to fetch crops data.');
        }
      } catch (error) {
        console.error('Error fetching crops data:', error);
      }
    };

    getWarehouse();
    getProductsByWarehouse();
    
  }, [selectedWarehouse,selectedCrop]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className="flex gap-6">
          <Select
            options={availableWarehouse}
            onChange={handleWarehouseChange}
          />
          {/* <Select
            options={CropItems}
            value={{
              value: selectedCrop,
              label: selectedCrop,
            }}
            onChange={handleCropChange}
          /> */}
          <select onChange={handleCropChange}>
            {
              CropItems.map((crop,index)=>{
                return(
                  <>
                 <option>{crop.crop}</option>
                  </>
                )
              })
            }
          </select>
        </div>
        <div className={styles.cards}>
          {dynamicCards.length === 0 ? (
            <div className={styles.container}>
              No Crop Found for this crop and warehouse
            </div>
          ) : (
            dynamicCards.map((item, i) => (
              <Card item={item} colorTheme={item.title} key={i} />
            ))
          )}
        </div>
        <div className="flex gap-4 max-w-[900px] mb-[-70px] mt-[-70px]">
          <PercentageDonutChart
            percentage={modelPrediction.spoilage}
            label1={"Spoilage"}
            style={{ height: "250px", width: "250px" }}
          />
          <PercentageDonut2Chart
            percentage={modelPrediction.life}
            label1={"life Span"}
            style={{ height: "250px", width: "250px" }}
          />
          {/* <div class="w-32 h-32 bg-blue-500 rounded-full flex flex-col items-center justify-center text-white font-bold">
    <label class="mb-2">Label 1</label>
    <label class="mb-2">Label 2</label>
  </div> */}
        </div>

        <Chart data={dynamicChart} />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
