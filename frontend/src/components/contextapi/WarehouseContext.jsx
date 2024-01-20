"use client"
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define initial state and reducer
const initialState = {
  warehouses: [],
};

const warehouseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_WAREHOUSE":
      return {
        ...state,
        warehouses: [action.payload],
      };
    // Add other cases as needed
    default:
      return state;
  }
};

// Create context
const WarehouseContext = createContext();

// Create a provider component
const WarehouseProvider = ({ children }) => {
  // Retrieve state from local storage on component mount
  const storedState = JSON.parse(localStorage.getItem("warehouseState")) || initialState;
  const [state, dispatch] = useReducer(warehouseReducer, storedState);

  // Update local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem("warehouseState", JSON.stringify(state));
  }, [state]);

  // Add any additional functions or state modifications here

  return (
    <WarehouseContext.Provider value={{ state, dispatch }}>
      {children}
    </WarehouseContext.Provider>
  );
};

// Create a custom hook for using the context
const useWarehouseContext = () => {
  const context = useContext(WarehouseContext);
  if (!context) {
    throw new Error("useWarehouseContext must be used within a WarehouseProvider");
  }
  return context;
};

export { WarehouseProvider, useWarehouseContext };
