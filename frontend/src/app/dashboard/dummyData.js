

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
        number: 50,
        change: 2,
      },
      {
        id: 3,
        title: "Oxygen",
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


export { cards };
