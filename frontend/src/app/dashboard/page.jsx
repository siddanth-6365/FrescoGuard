"use client";
import { useState, useEffect } from "react";
import Card from "../../components/ui/dashboard/card/card";
import Chart from "../../components/ui/dashboard/chart/chart";
import styles from "../../components/ui/dashboard/dashboard.module.css";
import Rightbar from "../../components/ui/dashboard/rightbar/rightbar";
import PercentageDonutChart from "../../components/ui/dashboard/donut/index";
import Select from "react-select";
import { cards } from "./dummyData";
import getRecommendations from "./recomandations";

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

const getProductsByWarehouse = (selectedWarehouse, data) => {
  console.log("selectedWarehouse :", selectedWarehouse);
  console.log("data :", data);
  const targetWarehouse = data.filter((warehouse) => {
    if (warehouse.name === selectedWarehouse) return warehouse;
  });
  console.log("targetWarehouse :", targetWarehouse);
  return targetWarehouse;
};

const CropItems = [
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "corn", label: "Corn" },
];
const getpropitems = (selectedCrop) => {
  const uniqueValues = [...new Set(selectedCrop)];
  return uniqueValues.map((item) => ({
    value: item.crop,
    label: item.crop,
  }));
};

const Dashboard = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState();
  const [availableWarehouse, setAvailableWarehouse] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [recommendations, setRecommendations] = useState([]);
  const [data, setData] = useState([]);
  const [dynamicCards, setDynamicCards] = useState([]);
  const [dynamicChart, setDynamicChart] = useState(chartsData);
  const [modelPrediction, setModelPrediction] = useState({
    spoilagePercentage: 0,
    lifeSpanPercentage: 0,
  });

  const handleWarehouseChange = (warehouse) => {
    setSelectedWarehouse(warehouse.value);
  };

  const handleCropChange = (crop) => {
    setSelectedCrop(crop.value);
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
    const getRecommendations = async () => {};
    getWarehouse();
  }, []);

  useEffect(() => {
    const cropsitems = getProductsByWarehouse(selectedWarehouse, data);
    console.log(data);
    setSelectedCrop(cropsitems);
  }, [selectedWarehouse]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className="flex gap-6">
          <Select
            options={availableWarehouse}
            onChange={handleWarehouseChange}
          />
          <Select
            options={CropItems}
            value={{
              value: selectedCrop,
              label: selectedCrop,
            }}
            onChange={handleCropChange}
          />
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
            percentage={modelPrediction.spoilagePercentage}
            label1={"Spoilage"}
            style={{ height: "250px", width: "250px" }}
          />
          <PercentageDonutChart
            percentage={modelPrediction.lifeSpanPercentage}
            label1={"life Span"}
            style={{ height: "250px", width: "250px" }}
          />
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
