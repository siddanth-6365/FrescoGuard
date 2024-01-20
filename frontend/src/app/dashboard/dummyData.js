

const cards = [
  {
    warehouse: "Warehouse 1",
    crop: "Wheat",
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
  {
    warehouse: "Warehouse 1",
    crop: "Wheat",
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

  const chartData = [
    {
      name: "Page A",
      uv: Math.random() * 4000,
      pv: Math.random() * 3000,
      amt: Math.random() * 3000,
    },
    {
      name: "Page B",
      uv: Math.random() * 4000,
      pv: Math.random() * 3000,
      amt: Math.random() * 3000,
    },
    {
      name: "Page C",
      uv: Math.random() * 4000,
      pv: Math.random() * 3000,
      amt: Math.random() * 3000,
    },
  ];


export { cards, chartData };
