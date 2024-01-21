import DonutChart from "react-donut-chart";
import "./donut.css";

const PercentageDonutChart = ({ percentage, label1 }) => {
  // Ensure the percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(0, percentage), 100);

  // // Calculate the remaining percentage to display an unfilled portion
  const remainingPercentage = 100 - clampedPercentage;

  // Create data for the DonutChart
  const data = [
    { label:  label1 , value: clampedPercentage, className: "filled" },
    { label: "Remaining", value: remainingPercentage, className: "remaining" },
  ];

  return <DonutChart data={data} />;
};
const PercentageDonut2Chart = ({ percentage, label1 }) => {
  // Ensure the percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(0, percentage), 1000);

  // // Calculate the remaining percentage to display an unfilled portion
  const remainingPercentage = 1000 - clampedPercentage;

  // Create data for the DonutChart
  const data = [
    { label:  label1 , value: clampedPercentage, className: "filled" },
    { label: "Remaining", value: remainingPercentage, className: "remaining" },
  ];

  return <DonutChart data={data} />;
};




export  {PercentageDonutChart,PercentageDonut2Chart};
