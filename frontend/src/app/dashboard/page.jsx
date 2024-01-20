"use client";
import { useState, useEffect } from "react";
import Card from "../../components/ui/dashboard/card/card";
import Chart from "../../components/ui/dashboard/chart/chart";
import styles from "../../components/ui/dashboard/dashboard.module.css";
import Rightbar from "../../components/ui/dashboard/rightbar/rightbar";
import Select from "react-select";

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

const cards = [
  {
    warehouse: "warehouse-1",
    crop: "wheat",
    params: [
      {
        id: 1,
        title: "Temperature",
        number: 20,
        change: 20,
      },
      {
        id: 2,
        title: "Humidity",
        number: 20,
        change: 2,
      },
      {
        id: 3,
        title: "Ventilation",
        number: 20,
        change: -12,
      },
    ],
  },
  {
    warehouse: "warehouse-1",
    crop: "corn",
    params: [
      {
        id: 1,
        title: "Temperature",
        number: 21,
        change: 3,
      },
      {
        id: 2,
        title: "Humidity",
        number: 324,
        change: -10,
      },
      {
        id: 3,
        title: "Ventilation",
        number: 20,
        change: 40,
      },
    ],
  },
  {
    warehouse: "warehouse-2",
    crop: "wheat",
    params: [
      {
        id: 1,
        title: "Temperature",
        number: 20,
        change: 0,
      },
      {
        id: 2,
        title: "Humidity",
        number: 20,
        change: 0,
      },
      {
        id: 3,
        title: "Ventilation",
        number: 20,
        change: 0,
      },
    ],
  },
];

const WarehouseItems = [
  { value: "warehouse-1", label: "Warehouse-1" },
  { value: "warehouse-2", label: "Warehouse-2" },
];
const CropItems = [
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "corn", label: "Corn" },
];

const Dashboard = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    WarehouseItems[0].value
  );
  const [selectedCrop, setSelectedCrop] = useState(CropItems[0].value);
  const [dynamicCards, setDynamicCards] = useState([]);
  const [dynamicChart, setDynamicChart] = useState(chartsData);

  const handleWarehouseChange = (warehouse) => {
    setSelectedWarehouse(warehouse.value);
  };

  const handleCropChange = (crop) => {
    console.log(crop);
    setSelectedCrop(crop.value);
  };

  useEffect(() => {
    // Filter cards based on selected warehouse and crop
    const filteredCards = cards
      .filter(
        (item) =>
          item.crop.toLowerCase() === selectedCrop?.toLowerCase() &&
          item.warehouse.toLowerCase() === selectedWarehouse?.toLowerCase()
      )
      .flatMap((item) => item.params);
    console.log("card :", filteredCards);
    setDynamicCards(filteredCards);

    // const filteredChart = chartsData.filter(
    //   (data) => data.name.toLowerCase() === selectedWarehouse?.toLowerCase()
    // );
    // setDynamicChart(filteredChart);
  }, [selectedWarehouse, selectedCrop]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className="flex gap-6">
          <Select
            options={WarehouseItems}
            value={selectedWarehouse}
            onChange={handleWarehouseChange}
          />
          <Select
            options={CropItems}
            value={selectedCrop}
            onChange={handleCropChange}
          />
        </div>
        <div className={styles.cards}>
          {dynamicCards.length === 0 ? (
            <div className={styles.container}>
              No Crop Found for this crop and warehouse
            </div>
          ) : (
            dynamicCards.map((item, i) => <Card item={item} key={i} />)
          )}
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
